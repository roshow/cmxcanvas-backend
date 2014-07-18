'use strict';

var file = (process.argv[2] || 'rev03dig.json'),
	bookjson = require('./' + file).data[0],
	fs = require('fs'),
	models = {},
	schema = {};

function cheapClone(a) {
   return JSON.parse(JSON.stringify(a));
}

/** metaData **/
models.metaData = cheapClone(bookjson);
delete models.metaData.cmxJSON;
models.metaData.id = models.metaData._id;

/** cmxJSON **/
models.cmxJSON = cheapClone(bookjson.cmxJSON);
models.cmxJSON.forEach(function (panel, i){
	panel.panel = i;
	panel.bookId = models.metaData.id;

	var imgurl = bookjson.img.url || '';
	panel.src = imgurl + panel.src;

	panel.popups = panel.popups || [];
	panel.popups.forEach(function (popup, ii){
		popup.popup = ii;
		popup.src = imgurl + popup.src
	});
});

Object.keys(models).forEach(function (key){
	var filename = bookjson._id + '.' + key + '.json';
	fs.writeFile('./' + filename, JSON.stringify(models[key], null, 4));
});
// fs.writeFile(filename, data, [options], callback)
