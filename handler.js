function booksAll(req, res, next, db){
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