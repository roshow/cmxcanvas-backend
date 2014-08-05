/*globals require, process, console */
'use strict';

var restify = require('restify'),
    db = require('./mongoose'),
    ro = require('./routils'),
    server = restify.createServer({ name: 'cxmcanvas' });

db.connect().then(function (){

    server.listen(process.env.PORT || 5000, function () {
      console.log('%s listening at %s', server.name, server.url);
    });

    server
      .use(restify.fullResponse())
      .use(restify.bodyParser());

    server.get('/cmx', function (req, res, next){
        db.find('cmxMetaData', {}).then(
            function (comics){
                res.send({
                    code: 200,
                    data: comics
                });
            }, function (error){
                console.log(error);
            });
        next();
    });

    server.get('/cmx/:id', function (req, res, next){
        db.find('cmxMetaData', { _id: req.params.id }).then(
            function (book){
                /** data massaging that will hopefully go away when I clean up the DB and set upload methods with rules **/
                book[0].id = book[0].id || book[0]._id;
                var panelsId = book[0].view || book[0].id + '_cmxjson';

                db.find('cmxJSON', { _id: panelsId }).then(function (panels){
                    book[0].view = panels[0];
                    res.send({
                        code: 200,
                        data: book
                    });
                }, function (error){ console.log(error); });

            }, function (error){ console.log(error); });
        next();
    });

    server.get('/panels/:id', function (req, res, next){
        db.find('cmxJSON', { _id: req.params.id }).then(
            function (panels){
                res.send({
                    code: 200,
                    data: panels
                });
            }, function (error){
                console.log(error);
            });
        next();
    });


});
