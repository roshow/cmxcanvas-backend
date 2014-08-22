var db = require('./db');
/** This is so repetative, it's sad. It can be broken down into like 2 function, tops and call them with apply from the export object. **/

function booksGetAll(req, res, next){
    db.find('metaData', {}).then(
        function (comics){
            res.send({
                code: 200,
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
            book = book[0];
            if (req.params.format){
                var formats = book.formats;
                for (var i = 0, l = formats.length; i < l; i++){
                    if (formats[i].format === req.params.format){
                        book.view_id = formats[i].view_id;
                        break;
                    }
                }
            }

            db.find('views', { id: book.view_id }).then(function (views){
                book.view = views[0];
                res.send({
                    code: 200,
                    data: book
                });
            }, function (error){ console.log(error); });

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