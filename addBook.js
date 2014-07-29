var parsejson = require('./parsejson'),
	db = require('./mongoose'),
    promised = require('promised-io/promise'),
	defaults;

defaults = {
	writeFile: false
};



if (process.argv[2]){
	var allthosepromises = [];
	db.connect().then(function (){
		var json = require(process.argv[2]).data[0],
		model = parsejson(json, process.argv[3] || defaults.writeFile);
		Object.keys(model).forEach(function (prop){
			allthosepromises.push(db.put(prop, model[prop]));
		});
		promised.all(allthosepromises).then(function (res){
	    	// console.log(stuff);
	    	for (var i = 0, l = res.length; i < l; i++){
	    		console.log(res[i]._id);
	    	}
	    	db.disconnect();
	    });
	});

    

}