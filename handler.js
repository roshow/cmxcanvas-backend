var db = require('./db');
/** This is so repetative, it's sad. It can be broken down into like 2 function, tops and call them with apply from the export object. **/

function booksGetAll(req, res, next){
    var queryPromise;
    if (req.params.ids){
        queryPromise = db.findList('metaData', 'id', req.params.ids.split(','), true);
    }
    else {
        queryPromise = db.find('metaData', {});
    }
    queryPromise.then(
        function (comics){
            res.send({
                code: 200,
                count: comics.length,
                data: comics
            });
        }, function (error){
            console.log(error);
        });
    next();
}

function booksGetOne(req, res, next){
    db.find('metaData', { id: req.params.id }).then(
        function (book){

            if (!book[0]){
                res.send(404, {
                    code: 404,
                    message: 'Not Found'
                });
                return;
            }

            if (req.params.format){
                var formats = book[0].formats;
                for (var i = 0, l = formats.length; i < l; i++){
                    if (formats[i].format === req.params.format){
                        book[0].view_id = formats[i].view_id;
                        break;
                    }
                }
            }

            db.find('views', { id: book[0].view_id }).then(
                function (views){

                    book[0].view = views[0];
                    res.send({
                        code: 200,
                        data: book
                    });
                },
                function (error){ console.log(error); }
            );

        }, function (error){ console.log(error); });
    next();
}

function viewsGetAll(req, res, next){
    db.find('views', {}).then(
        function (views){
            res.send({
                code: 200,
                data: views
            });
        }, function (error){
            console.log(error);
        });
    next();
}

function viewsGetOne(req, res, next){
    db.find('views', { id: req.params.id }).then(
        function (views){
            // console.log('views');
            // console.log(views);
            res.send({
                code: 200,
                data: views
            });
        }, function (error){
            console.log(error);
        });
    next();
}

module.exports = {
    books: {
        getAll: booksGetAll,
        getOne: booksGetOne
    },
    views: {
        getOne: viewsGetOne,
        getAll: viewsGetAll
    }
};