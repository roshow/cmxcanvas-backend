/* globals require, process, module */

'use strict';

// var models = {},
// 	schema = {};

// function cheapClone(a) {
//    return JSON.parse(JSON.stringify(a));
// }

// function parseJson(bookjson){

// 	/** MetaData **/
// 	if (bookjson.id){
// 		models.metaData = cheapClone(bookjson);
// 		if (models.metaData.view){
// 			delete models.metaData.view;
// 		}
// 	}

// 	/** Views **/
// 	if (bookjson.view_id && bookjson.panels){
// 		models.views = cheapClone(bookjson.view);
// 		models.views.id = models.views.view_id;

// 		models.views.panels.forEach(function (panel, i){
// 			panel.panel = i;
// 			panel.popups = panel.popups || [];

// 			panel.popups.forEach(function (popup, ii){
// 				popup.panel = i;
// 				popup.popup = ii;
// 			});
// 		});
// 	}
// 	// console.log(models)
// 	return models;
// }

// module.exports = parseJson;

module.exports = function(model){
	switch (model.__collection){
		case 'views':
			console.log(model.__collection);
			model.panels.forEach(function (panel, i){
				panel.panel = i;
				panel.popups = panel.popups || [];

				panel.popups.forEach(function (popup, ii){
					popup.panel = i;
					popup.popup = ii;
				});
			});
			return model;
		default:
			console.log('default');
			return model;
	}
}


