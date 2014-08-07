var db = require('./db');

function booksGetAll(req, res, next){
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
}

function booksGetOne(req, res, next){
    console.log(req.params);
    db.find('cmxMetaData', { id: req.params.id }).then(
        function (book){
            var viewId = book[0].view_id;
            if (req.params.format){
                var formats = book[0].formats;
                for (var i = 0, l = formats.length; i < l; i++){
                    if (formats[i].format === req.params.format){
                        viewId = formats[i].view_id;
                        break;
                    }
                    if (formats[i].default === true){
                        viewId = formats[i].view_id;
                    }
                }
            }
            else {
                ;                
            }

            db.find('cmxJSON', { id: viewId }).then(function (panels){
                book[0].view = panels[0];
                res.send({
                    code: 200,
                    data: book
                });
            }, function (error){ console.log(error); });

        }, function (error){ console.log(error); });
    next();
}

function viewsGetOne(req, res, next){
    db.find('cmxJSON', { id: req.params.id }).then(
        function (panels){
            res.send({
                code: 200,
                data: panels
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
        getOne: viewsGetOne
    }
};