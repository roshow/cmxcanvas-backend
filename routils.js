var ro = {};

ro.log = function(){
	for(var i = 0; i < arguments.length; i++) {
	  console.log(arguments[i]);
	}
};

module.exports = ro;