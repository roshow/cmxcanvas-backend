var db = require('./mongoose'),
    promised = require('promised-io/promise'),
    queries = [
      {id:'rev03dig_view'},
      {}
    ];
    
    db.connect().then(function (){
  
        function checkDocs(docs){
            for (var i = 0, l = docs.length; i < l; i++){
                doc = docs[i];
                if (!doc){
                    console.log('no match');
                }
                else if (!doc._id){
                    console.log('no _id');
                }
                else if(!doc.panels){
                    console.log('no panels, id=' + doc._id);
                }
                else {
                    console.log('good doc, id=' + doc._id);
                    // console.log(doc);
                }
            }
            return docs;
        }

        var allpromises = [];
      
        for (var i = 0, l = queries.length; i < l; i++){
            var promiseMeThis = db.find('cmxJSON', queries[i]).then(checkDocs);
            allpromises.push(promiseMeThis);
        }

        promised.all(allpromises).then(function (alldocs){
            console.log('disconnect.');
            db.disconnect();
        });

});
