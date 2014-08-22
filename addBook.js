var fs = require('fs'),
	db = require('./db'),
	parsejson = require('./parsejson'),
    promised = require('promised-io/promise'),
	defaults;

defaults = {
	writeFile: true
};


if (process.argv[2]){
	var allthosepromises = [];
	db.connect().then(function (){
		for (var i = 2, l = process.argv.length; i < l; i++){
			var models = require(process.argv[i]);
			for (var ii = 0, ll = models.length; ii < ll; ii++){
				var model = parsejson(models[ii]);
				allthosepromises.push(db.override(model.__collection, model));
			}			
		}
		promised.all(allthosepromises).then(function (res){
	    	// console.log(res);
	    	for (var i = 0, l = res.length; i < l; i++){
	    		console.log(res[i].id);
				if (defaults.writeFile){
					var filename = res[i].id + '.json';
					fs.writeFile('./json/db/' + filename, JSON.stringify(res, null, 4));
				}
	    	}
	    	db.disconnect();
	    });
	});

    

}