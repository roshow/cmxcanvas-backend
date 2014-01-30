var mongoConf = require('nconf')
                    .file({ file: 'conf/heroku.json' })
                    .get('mongo'),
    db = require('mongojs').connect(mongoConf.uri, mongoConf.collections);

exports.db_cmx = (function() {
    var db_cmx = {
        comics: {
            get: function(q, cb) {
                db.cmxMetaData.find(q, function(e, r) {
                    cb && cb(e, r);
                });
            },  
            findOne: function(q, cb) {
                db.cmxMetaData.find(q, function(e, r) {
                    cb && cb(e, r[0]);
                });
            }
        },

        cmxJSON: {
            get: function(q, cb) {
                db.cmxJSON.find(q, function(e, r) {
                    cb && cb(e, r[0]);
                });
            },
            set: function(q, u, cb) {
                db.users.findAndModify({
                    query: q,
                    update: u,
                    new: true
                }, function(e, r) {
                    cb && cb(r);
                });
            }
        }
    };
    return db_cmx;
}());