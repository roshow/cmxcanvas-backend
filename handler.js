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
    db.find('cmxMetaData', { _id: req.params.id }).then(
        function (book){
            /** data massaging that will hopefully go away when I clean up the DB and set upload methods with rules **/
            book[0].id = book[0].id || book[0]._id;
            var panelsId = book[0].view_id || book[0].id + '_cmxjson';

            if (req.params.format && book[0].versions){
                var bookvers = book[0].versions;
                for (var i = 0, l = bookvers.length; i < l; i++){
                    if (bookvers[i].format === req.params.format){
                        panelsId = bookvers[i].view_id;
                        break;
                    }
                }
            }

            db.find('cmxJSON', { _id: panelsId }).then(function (panels){
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