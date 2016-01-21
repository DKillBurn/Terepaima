var bigData = require('../models/siteData');

var aboutController = function (server){
	console.log('aboutController has been initialized');
	/*INICIA MIDDLEWARES*/
	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/aboutUs', function (req, res){
		bigData.findOne({}, function (err, data){
			//debugger;
			var aTmp = data.about.pop();
			res.render('about', {abt: aTmp});
			return;
		});
	});
	/*FINALIZA RUTAS*/
};

module.exports = aboutController;