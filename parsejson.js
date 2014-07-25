/* globals require, process, module */

'use strict';

var fs = require('fs'),
	models = {},
	schema = {};

function cheapClone(a) {
   return JSON.parse(JSON.stringify(a));
}

function parseJson(bookjson, writeFiles){

	bookjson.id = bookjson.id || bookjson._id;
	// bookjson.img.url = bookjson.img.url || '';

	/** cmxMetaData **/
	models.cmxMetaData = cheapClone(bookjson);
	models.cmxMetaData.cmxJSON = bookjson.id + '_cmxjson';
	models.cmxMetaData.img = null;
	// console.log(models.cmxMetaData);

	/** cmxJSON **/
	models.cmxJSON = {
		_id: bookjson.id + '_cmxjson',
		id: bookjson.id + '_cmxjson',
		JSON: cheapClone(bookjson.cmxJSON)
	};

	models.cmxJSON.JSON.forEach(function (panel, i){

		panel.panel = i;
		panel.bookId = models.cmxMetaData.id;
		// panel.src = bookjson.img.url + panel.src;
		panel.popups = panel.popups || [];

		panel.popups.forEach(function (popup, ii){
			popup.popup = ii;
			// popup.src = bookjson.img.url + popup.src;
		});
	});

	if (writeFiles){
		Object.keys(models).forEach(function (key){
			var filename = bookjson.id + '.' + key + '.json';
			fs.writeFile('./json/' + filename, JSON.stringify(models[key], null, 4));
		});
	}

	return models;
}

module.exports = parseJson;
