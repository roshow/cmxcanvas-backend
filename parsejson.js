/* globals require, process, module */

'use strict';

var models = {},
	schema = {};

function cheapClone(a) {
   return JSON.parse(JSON.stringify(a));
}

function parseJson(bookjson){

	bookjson.id = bookjson.id || bookjson._id;
	// bookjson.img.url = bookjson.img.url || '';

	/** cmxMetaData **/
	if (bookjson.id){
		models.cmxMetaData = cheapClone(bookjson);
		if (models.cmxMetaData.view){
			delete models.cmxMetaData.view;
		}
	}

	/** cmxJSON **/
	if (bookjson.view){
		models.cmxJSON = cheapClone(bookjson.view);
		models.cmxJSON._id = bookjson.view_id;
		models.cmxJSON.id = bookjson.view_id;

		models.cmxJSON.panels.forEach(function (panel, i){

			panel.panel = i;
			panel.bookId = models.cmxJSON.id;
			// panel.src = bookjson.img.url + panel.src;
			panel.popups = panel.popups || [];

			panel.popups.forEach(function (popup, ii){
				popup.panel = i;
				popup.popup = ii;
				popup.bookId = models.cmxJSON.id;
				// popup.src = bookjson.img.url + popup.src;
			});
		});
	}

	return models;
}

module.exports = parseJson;
