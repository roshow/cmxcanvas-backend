var fs = require('fs'),
	parsejson = require('./parsejson'),
	db = require('./db'),
    promised = require('promised-io/promise'),
	defaults;

defaults = {
	writeFile: true
};



if (process.argv[2]){
	var allthosepromises = [];
	db.connect().then(function (){
		var json = require(process.argv[2]).data[0],
			model = parsejson(json);
		Object.keys(model).forEach(function (prop){
			if (defaults.writeFile){
				var filename = model[prop].id + '.' + prop + '.json';
				fs.writeFile('./json/db/' + filename, JSON.stringify(model[prop], null, 4));
			}
			// console.log(model[prop]);
			allthosepromises.push(db.override(prop, model[prop]));
		});
		promised.all(allthosepromises).then(function (res){
	    	// console.log(stuff);
	    	console.log(res);
	    	for (var i = 0, l = res.length; i < l; i++){
	    		console.log(res[i]._id);
	    	}
	    	db.disconnect();
	    });
	});

    

}