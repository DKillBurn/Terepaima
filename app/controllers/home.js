var bigData = require('../models/siteData');
var newsData = require('../models/noticia');

var sTmp, aTmp;

var homeController = function (server, moment){
	console.log('homeController has been initialized');
	/*INICIA MIDDLEWARES*/
	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/', function (req, res){
		bigData.findOne({}, function (err, data){
			sTmp = data.eslogan.pop();
			aTmp = data.about.pop();
		});
		newsData.find({}, function (err, data){
			data.forEach(function (obj, index, arr){
				//debugger;
				var x = moment(obj.date);
				obj.date = x.format('dddd DD, MMMM YYYY');
			});

			
			res.render('home', {s1: sTmp.s1, s2: sTmp.s2, s3: sTmp.s3, nws:data});
			return;
		}).sort({_id:-1});
	});
	/*FINALIZA RUTAS*/
};

module.exports = homeController;