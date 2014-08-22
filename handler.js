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
    // console.log(req.params);
    db.find('metaData', { id: req.params.id }).then(
        function (book){
            // console.log(book.view_id);
            if (req.params.format){
                var formats = book[0].formats;
                for (var i = 0, l = formats.length; i < l; i++){
                    if (formats[i].format === req.params.format){
                        book[0].view_id = formats[i].view_id;
                        break;
                    }
                    // if (formats[i].default === true){
                    //     book[0].view_id = formats[i].view_id;
                    // }
                }
            }

            db.find('views', { id: book[0].view_id }).then(function (views){
                // console.log(view);
                book[0].view = views[0];
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