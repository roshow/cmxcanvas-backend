var parsejson = require('./parsejson'),
	db = require('./mongoose'),
	defaults;

defaults = {
	writeFile: true
};


function putData(){
	
	// db.put('cmxMetaData')
}

if (process.argv[2]){
	db.connect().then(function (){
		var json = require(process.argv[2]).data[0],
		model = parsejson(json, process.argv[3] || defaults.writeFile);
		// console.log(model.cmxMetaData);
		Object.keys(model).forEach(function (prop){
			db.put(prop, model[prop]).then(function (res){
				console.log(res._id);
			});
		});
		// db.put('cmxMetaData', model.cmxMetaData).then(function (res){
		// 	console.log(res);
		// });
	});

}