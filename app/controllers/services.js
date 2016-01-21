var bigData = require('../models/siteData');

var serviceController = function (server){
	console.log('serviceController has been initialized');
	/*INICIA MIDDLEWARES*/
	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/services', function (req, res){
		bigData.findOne({}, function (err, data){
			res.render('services', {svcs: data.services});
			return;
		});
	});
	/*FINALIZA RUTAS*/
};

module.exports = serviceController;