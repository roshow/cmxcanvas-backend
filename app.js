CONFIG = {
    mongo: {
        uri: 'mongodb://you:comein@ds043348.mongolab.com:43348/cmxcanvas'
    },
    port: process.env.PORT || 5000
}

var express = require('express'),
    handler = require('./handler').handler,
    app = express(),
    _port = CONFIG.port;

app.use(express.static(__dirname + '/www'));

app.listen(_port);
app.get('/getcmxjson/:id', handler.getcmxjson);
app.get('/getallcmx', handler.getallcmx);
app.get('*', function(req, res){
    res.send('404, friends.');
});

console.log('cmxcanvas-backend listening on port ' + _port);