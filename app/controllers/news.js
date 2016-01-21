var newsData = require('../models/noticia');

var newsController = function (server, moment){
	console.log('newsController has been initialized');
	/*INICIA MIDDLEWARES*/
	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/news', function (req, res){
		newsData.find({}, function (err, data){
			var tmp = 0;
			var dateTime = [];

			data.forEach(function (obj, index, arr){
				//debugger;
				var x = moment(obj.date); 
				obj.date=x.format('dddd DD, MMMM YYYY');
			});

			res.render('news', {nws: data, dt:dateTime});
			return;
		}).sort({_id:-1});
	});
	/*FINALIZA RUTAS*/
};

module.exports = newsController;