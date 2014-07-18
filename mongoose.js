var mongoose = require('mongoose'),
    metaDataSchemaJson = require('./metadataSchema'),
    cmxjsonSchemaJson = require('./cmxJSONSchema');

mongoose.connect('mongodb://you:comein@ds043348.mongolab.com:43348/cmxcanvas');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
    console.log('yay');
    var metaDataSchema = mongoose.Schema(metaDataSchemaJson, { collection: 'cmxMetaData'});
    var cmxMetaData = mongoose.model('cmxMetaData', metaDataSchema);
    // cmxMetaData.find(function (err, cmxmd) {
    //     if (err){
    //         console.log(err);
    //     }
    //     console.log(cmxmd)
    // });
    var cmxjsonSchema = mongoose.Schema(cmxjsonSchemaJson, { collection: 'cmxJSON'});
    var cmxJSON = mongoose.model('cmxJSON', cmxjsonSchema);
    cmxJSON.find(function (err, cmxmd){
        if (err){
            console.log(err);
        }
    });
});