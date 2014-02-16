var restify = require('restify'),
    db = require('./db'),
    server = restify.createServer({ name: 'cxmcanvas' })
 
server.listen(process.env.PORT || 5000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.get('/cmx', function (req, res, next) {
  db.comics.get({}, function (error, comics) {
    res.send({ 
        code: 200,
        data: comics 
    });
  });
});
server.get('/cmx/:id', function (req, res, next) {
    db.comics.findOne({ _id: req.params.id }, function (error, comic) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        if (comic) {
            db.cmxJSON.get({ _id: comic.cmxJSON }, function(error, cmxjson) {
                if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
                if (cmxjson) {
                    console.log(cmxjson);
                    comic.cmxJSON = cmxjson.JSON;
                    res.send({ 
                        code: 200,
                        data: [ comic ]
                    });
                    return next();
                }
                else {
                    res.send(404, {
                        code: "ResourceNotFound",
                        message: "No matching records."
                    });
                    return next();
                }
            });
        }
        else {
            res.send(404,{
                code: "ResourceNotFound",
                message: "No matching records."
            });
            return next();
        }
    });
});

function getCmxjson(req, res, next){
    if (!/_cmxjson$/.test(req.params.id)){
        req.params.id += '_cmxjson';
    }
    db.cmxJSON.get({ _id: req.params.id }, function(error, cmxjson) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        if (cmxjson) {
            res.send({
                code: 200,
                data: cmxjson.JSON
            });
            return next();
        }
        // else return next(new NoMatches());
        else {
            res.send(404, {
                code: 404,
                message: "No Matches"
            });
            return next();
        }
    });   
}

server.get('/cmxjson/:id', getCmxjson);
server.get('/cmx/:id/panels', getCmxjson);

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