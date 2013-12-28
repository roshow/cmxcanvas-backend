var restify = require('restify'),
    db = require('./db_cmx.js').db_cmx,
    server = restify.createServer({ name: 'my-api' });
 
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

var util = require('util');
function NoMatches(message) {
  restify.RestError.call(this, {
    restCode: 'NoMatches',
    statusCode: 411,
    message: message || 'Nothing on this, babe.',
    constructorOpt: NoMatches
  });
  this.name = 'NoMatches';
};
util.inherits(NoMatches, restify.RestError);

server.get('/hello/:name', function(req, res, next) {
  return next(new NoMatches('not feeling you.'));
  // return next(new restify.ConflictError('not feeling you.'));
});

server.get('/comics', function (req, res, next) {
  db.comics.get({}, function (error, comics) {
    res.send(comics);
  });
});
server.get('/comics/:id', function (req, res, next) {
  db.cmxJSON.get({ _id: req.params.id + '_cmxjson' }, function(error, cmxjson) {        
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        if (cmxjson) {        
            console.log(cmxjson);
            db.comics.get({ _id: req.params.id }, function (error, comic) {
                if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
                if (comic) {
                    comic[0].cmxJSON = cmxjson.JSON;
                    res.send(comic[0]);
                }
                else return next(new restify.InvalidArgumentError('NoMatches'));
            });
        } 
        else return next(new restify.InvalidArgumentError('NoMatches'));
        // else res.send(404);
    });  
});
server.get('/cmxjson/:id', function (req, res, next) {
    db.cmxJSON.get({ _id: req.params.id }, function(error, cmxjson) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        if (cmxjson) {
            res.send(cmxjson);
        }
        else return next(new NoMatches());
    });    
});