'use strict';

var ro = global.ro || require('./routils');

var mongoose = require('mongoose'),
    promised = require('promised-io/promise'),
    db = {},
    conf;


conf = {
    db: {
        user: process.env.CBDB_USER,
        pw: process.env.CBDB_PW,
        models: [
            {
                collection: 'cmxMetaData',
                schema: require('./metadataSchema'),
            },
            {
                collection: 'cmxJSON',
                schema: require('./cmxJSONSchema'),
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

conf.db.models.forEach(function (model){
    var modelSchema = mongoose.Schema(model.schema, { collection: model.collection }),
        modelName = model.name || model.collection; 
    mongoose.model(modelName, modelSchema);
});


db.find = function(model, query){
    ro.log('finding:', query, 'in:', model);
    var deferred = new promised.Deferred();
    mongoose.model(model).find(query || {}, function (err, docs){
        // console.log(arguments);
        if (err) { deferred.reject(err); }
        else { deferred.resolve(docs); }
    });
    return deferred;
};

db.put = function(modelName, model){
    var def = new promised.Deferred();
    if (model._id){
        var _id = model._id;
        delete model._id;
        mongoose.model(modelName).findOneAndUpdate({ _id: _id }, model, { upsert : true }, function(err, updatedModel){
            if (err) {
                def.reject(err);
            }
            else {
                def.resolve(updatedModel);
            }
        });
    }
    else {
        mongoose.model(modelName).create(model, function(err, savedModel){
            // console.log(arguments);
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

module.exports = db;