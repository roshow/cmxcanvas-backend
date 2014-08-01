var db = require('./mongoose');
db.connect().then(function (){
  console.log('connecting');
  db.find('cmxJSON', {id:'rev03dig_cmxjson'}).then(function (docs){
      doc = docs[0];
      if (!doc){
        console.log('no match');
      }
      else {
        console.log(doc);
      }
      db.disconnect();
  });
});
