 // _id: 53d72c52490b7d43716f07ed,
 //  popups: 
 //   [ { src: 'panel25p01.png',
 //       path: '/images/rev03dig/',
 //       x: 306,
 //       y: 56,
 //       panel: 24,
 //       popup: 0,
 //       bookId: 'rev03dig_cmxjson',
 //       _id: 53d72c52490b7d43716f07ef },
 //     { src: 'panel25p02.png',
 //       path: '/images/rev03dig/',


var d = {};
db.find('cmxJSON', { id: 'rev03dig_cmxjson' }).then(function (docs){
    d.doc = docs[0];
    console.log('set');
});