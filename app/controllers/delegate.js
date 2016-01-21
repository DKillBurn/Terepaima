var authUser = require('../models/authUser');
var bigData = require('../models/siteData');
var newsData = require('../models/noticia');
var crypt = require('bcrypt-nodejs'),
	multer = require('multer'),
	time = require('moment');

var isAdminLogged = false;
var actualUser = null;

var upload_data = multer({ dest: 'public/storage/data/' });
var upload_news = multer({ dest: 'public/storage/news/' });

var delegateController = function (server){
	console.log('adminDelegation has been initialized');
	/*INICIA MIDDLEWARES*/
	var notLoggedIn = function(req, res, next){
		//debugger;
		if(!req.session.user){
			res.redirect('/auth');
			return;
		}else{
			/*var salt = crypt.genSaltSync();
			var user = new authUser({
				username : req.session.user,
				name	 : 'Admin',
				password : crypt.hashSync(req.session.accs, salt),
				lastLogin: Date.now()
			});

			user.save(function (err){
				debugger;
				if(err){
					done(err, null);
					return;
				}

				done(null, profile);
			});*/
			/*debugger;
			var general = new bigData({
				eslogan  : [{s1:'Soluciones Integradas', s2:'A la Medida', s3:'De sus Necesidades'}],
				services : [{name:'Logística y Distribución', desc:'Ofrecemos el más amplio servicio logistico, brindando el mejor producto, en tiempo y forma adecuada proporcionando la mejor visibilidad de la cadena de tecnologias de transporte y logistica innovadoras que optimizan el suministro y la flexibilidad.', imgurl:'../images/logistics.jpg'}, 
				{name:'Entretenimiento y Eventos', desc:'Promovemos los mejores eventos poniendo a disposición un grupo de profesionales altamente capacitados en distintas áreas para asistirlo en la realización de todo tipo de espectáculo musical, cultural y recreativo así como educativo en general, llevando a cabo un plan de relaciones publicas y marketing requerido.', imgurl:'../images/event.jpg'}, 
				{name:'Sistemas Modernos Tecnologicos', desc:'Ofrecemos el mejor servicio de ventas e instalación de software, reparación y asistencia remota de equipos de cómputo, eliminacion de archivos maliciosos, virus y análisis garantizado de estatus de tu maquina o laptop.', imgurl:'../images/datacenter.jpg'}],
				about	 : [{
					us:'Somos un grupo empresarial que ofrece los mejores productos y servicios según las necesidades de los interesados, considerando distribución de productos, entretenimiento de primera, como sistemas de software tecnológico y muchos otros servicios. Nos comprometemos en brindar desde cada una de nuestras áreas la mayor responsabilidad y compromiso, para hacer de cada desafio algo único.', 
					mision:'Nos dedicamos a ofrecer una gama de servicios acordes a las necesidades del público en general, satisfaciendo necesidades y cumpliendo con elevados estándares de calidad; brindando la solución adecuada y de la manera correcta.', 
					misionimgurl:'', 
					vision:'Prestar el mejor y más sofisticado servicio, con la mayor eficacia y el mayor compromiso para el goce deleite de nuestros clientes y consumidores.', 
					visionimgurl:''}]
			});

			general.save();*/

			/*debugger;
			var x = time(new Date());
			var general2 = new newsData({
				title	: 'Inauguracion en Ecuador',
				subtitle: 'Ahora nos ubicamos en el ecuador',
				date	: x.format('YYYY-MM-DD'),
				details : 'se tiende a saber que llegamos a ecuador, gracias al financiamento de empresarios japoneses y la gran atribucion de Zaisus Nandi Ponce Isturiz. con el gran apoyo contamos con soficticado sistemas modernos tecnologicos y un establecimiento bien situado en las lomas.',
				imgurl	: 'images/Evento.jpg',
				author	: 'Sail Ponce'
			});

			general2.save();*/
			
			authUser.findOne({username: req.session.user.toString()}, function (err, usr){
				if(usr){
					//debugger;
					//actualUser = actualUser != null ? actualUser : req.sessionID;
					if(crypt.compareSync(req.session.accs, usr.password)){
						//server.io.broadcast('aconnect', {content: isAdminLogged});
						next();
					}else{
						res.redirect('/auth');
						return;
					}
				}else{
					res.redirect('/auth');
					return;
				}
			});
			return;
		}
			
	};

	/*var isLoggedIn = function(req, res, next){
		debugger;
		req.session.user = req.body.authusr;
		if(req.session.user){
			res.redirect('/delegate');
			return;
		}

		next();
	};*/

	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/delegate', notLoggedIn, function (req, res){
		bigData.findOne({}, function (err, data){
			//debugger;
			var sTmp = data.eslogan.pop();
			var aTmp = data.about.pop();
			res.render('delegate', {s1: sTmp.s1, s2: sTmp.s2, s3: sTmp.s3, abt: aTmp});
			return;
		});
		//res.render('delegate');
	});

	server.get('/auth', function (req, res){
		//debugger;
		//server.io.broadcast('available', {content: isAdminLogged});
		res.render('auth');
	});

	server.get('/auth-news', notLoggedIn,function (req, res){
		//debugger;
		newsData.find({}, function (err, data){
			res.render('auth-news', {nws: data});
			return;
		});
	});

	server.get('/auth-serv', notLoggedIn,function (req, res){
		//debugger;
		bigData.findOne({}, function (err, data){
			res.render('auth-serv', {svcs: data.services});
			return;
		});
	});

	server.post('/authenticate',function (req, res){
		req.session.user = req.body.authusr;
		req.session.accs = req.body.authpw;
		res.redirect('/delegate');
	});

	server.get('/auth-close', function (req, res){
		req.session.destroy();
		server.io.broadcast('adisconnect');
		res.redirect('/');
	});

	server.post('/auth-save', function (req, res){
		bigData.update({}, {$set:{eslogan: {s1:req.body.s_l1, s2:req.body.s_l2, s3:req.body.s_l3}, about: {us:req.body.abt_nosotros, mision:req.body.abt_mision, misionimgurl:'', vision:req.body.abt_vision, visionimgurl:''}}}, function (err, result){});
		res.redirect('/delegate');
	});

	server.post('/auth-svc-save', upload_data.single('new_sv_img'), function (req, res){
		//debugger;
		if(req.file){
			//var ext = req.file.originalname.split('.');
			var pth = "../storage/data/"+req.file.filename;
			if(req.body.new_sv_title != '' && req.body.new_sv_detail != ''){
				bigData.update({}, {$push:{services: {name:req.body.new_sv_title, desc:req.body.new_sv_detail, imgurl:pth}}}, function (err, result){});
			}
		}
		res.redirect('/auth-serv');
	});

	server.get('/auth-svc-del/:svc', notLoggedIn, function (req, res){
		//debugger;
		bigData.update({}, {$pull:{services: {name:req.params.svc}}}, function (err, result){});
		//Aqui se implementa la funcion de eliminado de los servicios que ofrece la empresa
		//console.log('Request Accepted');
		res.redirect('/delegate');
	});

	server.post('/auth-nws-save', upload_news.single('add_nw_img'), function (req, res){
		//AQUI TE QUEDASTE CONFIGURANDO EL GUARDADO DE NOTICIAS
		//debugger;
		if(req.file){
			//var ext = req.file.originalname.split('.');
			var pth = "../storage/news/"+req.file.filename;
			
			if(req.body.new_nw_title != '' && req.body.new_nw_subtitle != '' && req.body.new_nw_date != '' && req.body.new_nw_author != '' && req.body.new_nw_detail != ''){
				var x = time(new Date());
				var nwNoticia = new newsData({
					title	: req.body.new_nw_title,
					subtitle: req.body.new_nw_subtitle,
					date	: x.format('YYYY-MM-DD'),
					details : req.body.new_nw_detail,
					imgurl	: pth,
					author	: req.body.new_nw_author
					});
				nwNoticia.save();
			}
		}
		res.redirect('/auth-news');
	});

	server.get('/auth-nws-del/:nws', notLoggedIn, function (req, res){
		newsData.remove({title:req.params.nws}, function (err, data){});
		//Aqui se implementa la funcion de eliminado de las noticias de la empresa
		//console.log('Request Accepted');
		res.redirect('/delegate');
	});
	/*FINALIZA RUTAS*/

	/*RUTAS DE SOCKET.IO*/
	server.io.route('occupied', function(req){
		isAdminLogged = true;
	});

	server.io.route('logout', function(req){
		actualUser = null;
		isAdminLogged = false;
	});

	server.io.route('unload-logout', function(req){
		server.io.broadcast('adisconnect');
	});
	/*FINALIZA RUTAS*/
};

module.exports = delegateController;