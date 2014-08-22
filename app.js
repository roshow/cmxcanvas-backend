/*globals require, process, console */
'use strict';

var restify = require('restify'),
    db = require('./db'),
    ro = require('./routils'),
    handler = require('./handler'),
    server = restify.createServer({ name: 'cxmcanvas' });

db.connect().then(function (){

    server.listen(process.env.PORT || 5000, function () {
      console.log('%s listening at %s', server.name, server.url);
    });

    server
      .use(restify.fullResponse())
      .use(restify.bodyParser())
      .use(restify.queryParser());

    server.get('/books', handler.books.getAll);
    server.get('/books/', handler.books.getAll);
    server.get('/books/:id', handler.books.getOne);
    server.get('/views', handler.views.getAll);
    server.get('/views/', handler.views.getAll);
    server.get('/views/:id', handler.views.getOne);


});
