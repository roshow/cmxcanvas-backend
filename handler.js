var dbc = require('./db_cmx.js').db_cmx;

exports.handler = (function() {

    var handler = {

        getallcmx: function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            console.log('handling /getallcmx');
            var _q = {
                published: 1
            };
            dbc.metadata.get(_q, function(r) {
                res.send(r);
            });
        },

        getcmxjson: function(req, res){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            console.log('handling /getcmxjson');
            var _q = {
                _id: req.params.id
            };
            dbc.metadata.get(_q, function(r){
                r = r[0];
                dbc.cmxjson.get({
                    _id: r.cmxJSON
                }, function(j) {
                    j = j[0];
                    r.cmxJSON = j.JSON;
                    res.send(r);
                });
            });
        }
    };
    
    return handler;

}());