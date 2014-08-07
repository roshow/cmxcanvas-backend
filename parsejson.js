/* globals require, process, module */

'use strict';

var models = {},
	schema = {};

function cheapClone(a) {
   return JSON.parse(JSON.stringify(a));
}

function parseJson(bookjson){

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
		models.cmxJSON.id = bookjson.view_id;

		models.cmxJSON.panels.forEach(function (panel, i){
			panel.panel = i;
			panel.popups = panel.popups || [];

			panel.popups.forEach(function (popup, ii){
				popup.panel = i;
				popup.popup = ii;
			});
		});
	}

	return models;
}

module.exports = parseJson;
