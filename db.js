/* globals require */

'use strict';

var mongoose = require('mongoose'),
    promised = require('promised-io/promise'),
    ro = require('./routils'),
    db = {},
    conf;


conf = {
    db: {
        user: process.env.CBDB_USER,
        pw: process.env.CBDB_PW,
        models: [
            {
                collection: 'metaData',
                schema: require('./metadataSchema'),
            },
            {
                collection: 'views',
                schema: require('./viewSchema'),
            }
        ]
    }
};
if (process.env.CANVASBOOK_ENV === 'staging'){
    ro.log('using staging db');
    conf.db.host = 'ds053439.mongolab.com';
    conf.db.database = 'canvasbookstaging';
    conf.db.port = '53439';
}
else {
    ro.log('connecting to production');
    conf.db.host = 'ds043348.mongolab.com';
    conf.db.database = 'cmxcanvas';
    conf.db.port = '43348';
}
var dbModels = {};
conf.db.models.forEach(function (model){
    var modelSchema = mongoose.Schema(model.schema, { collection: model.collection }),
        modelName = model.name || model.collection; 
    dbModels[modelName] = mongoose.model(modelName, modelSchema);
});


db.find = function(model, query){
    // ro.log('finding:', query, 'in:', model);
    var deferred = new promised.Deferred();
    dbModels[model].find(query || {}, function (err, docs){
        // console.log(arguments);
        if (err) { deferred.reject(err); }
        else { deferred.resolve(docs); }
    });
    return deferred;
};

db.put = function(modelName, model){
    var def = new promised.Deferred();
    if (model.id){
        dbModels[modelName].findOneAndUpdate({ id: model.id }, model, { upsert : true }, function(err, updatedModel){
            if (err) {
                def.reject(err);
            }
            else {
                def.resolve(updatedModel);
            }
        });
    }
    else {
        dbModels[modelName].create(model, function(err, savedModel){
            if (err) {
                def.reject(err);
            }
            else {
                def.resolve(savedModel);
            }
        });
    }
    return def;
};

db.override = function(modelName, model){
    var def = new promised.Deferred();
    if (model.id){
        // console.log('got model.id, removing ' + model.id);
        dbModels[modelName].findOneAndRemove({ id: model.id }, function(err){
            if (err) {
                def.reject(err);
            }
            else {
                // console.log('creating new');
                dbModels[modelName].create(model, function (err, savedModel){
                    // console.log(err);
                    def.resolve(savedModel);
                });
            }
        });
    }
    else {
        dbModels[modelName].create(model, function (err, savedModel){
            def.resolve(savedModel);
        });
    }
    return def;
};

db.putABunch = function(models){
    var that = this,
        allthosepromises = [];
    models.forEach(function (model){
        allthosepromises.push(that.update(model));
    });
    return promised.all(allthosepromises);
};

db.connect = function(){
    var deferred = new promised.Deferred();
    mongoose.connect('mongodb://' + conf.db.user + ':' + conf.db.pw +  '@' + conf.db.host + ':' + conf.db.port + '/' + conf.db.database);
    mongoose.connection
        .on('error', console.error.bind(console, 'connection error:'))
        .once('open', deferred.resolve);
    return deferred;
};

db.disconnect = function(){
    mongoose.disconnect();
};

module.exports = db;