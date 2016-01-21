//DECLARACION DE TODOS LOS PAQUETES
var express=require('express.io'),
	swig = require('swig');

var timeNow = require('moment');
var logger = require('morgan');
var body = require('body-parser');
var cookie = require('cookie-parser');
var exses = require('express-session');
var RedisStore = require('connect-redis')(exses);

var score = require('underscore');

var server=express();
server.http().io();

/* Variables */
var messages = [];
var responses = [];

var users = [];

/*MIDDLEWARES
var isntLoggedIn = function(req, res, next){
	if(!req.session.user){
		res.redirect('/');
		return;
	}

	next();
};
var isLoggedIn = function(req, res, next){
	if(req.session.user){
		res.redirect('/app');
		return;
	}

	next();
};*/

//CARGAR ARCHIVOS ESTATICOS
server.use(express.static('./public'));

//CONFIGURACION PARA RENDERIZAR VISTAS
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');
timeNow.locale('es');


//AGREGAMOS GET, POST, COOKIES, SESSIONS
server.use(logger('combined'));

server.use(body.urlencoded({ extended: false }));
server.use(cookie());

server.use(exses({
	secret : "loritokierebachata",
	store: new RedisStore({ host: 'localhost', port: 6379}),
	resave: true,
    saveUninitialized: false
	// store : new RedisStore({
	//	host: conf.redis.host,
	//port: conf.redis.port,
	//user: conf.redis.user,
	//pass: conf.redis.pass,
	//});
}));

//CONTROLLERS
var homeController = require('./app/controllers/home');
var serviceController = require('./app/controllers/services');
var aboutController = require('./app/controllers/about');
var newsController = require('./app/controllers/news');
var contactController = require('./app/controllers/contact');
var delegateController = require('./app/controllers/delegate');

homeController(server, timeNow);
serviceController(server);
aboutController(server);
newsController(server, timeNow);
contactController(server);
delegateController(server);

/*
server.get('/', function (req, res){
	res.render('home');
});

server.get('/app', isntLoggedIn,function (req, res){
	res.render('app', {user: req.session.user, users: users});
});

server.get('/log-out', function (req, res){
	users = score.without(users, req.session.user);
	server.io.broadcast('log-out', {username: req.session.user});
	req.session.destroy();
	res.redirect('/');
});
server.post('/log-in', function (req, res){
	users.push(req.body.username);
	req.session.user = req.body.username;
	server.io.broadcast('log-in', {username: req.session.user});
	res.redirect('/app');
});*/

//EJEMPLO DE SOCKETIO RUTA PARA CONTESTAR
/*server.io.route('occupied', function(req){
	console.log('Change admin to: '+isAdminLogged);
});

server.io.route('logout', function(req){
	console.log('Change admin to: '+isAdminLogged);
});*/

/*server.get('/supervisor', function(req, res){
	res.send('supervisor es muy chido loko');
});


server.get('/', function(req, res){
	res.send('hello world');
});

server.get('/messages', function(req, res){
	responses.push(res);
	//res.send(messages+'<script>setTimeout(function(){window.location.reload()})</script>');
});

server.get('/messages/:message', function(req, res){
	messages.push(req.params.message);
	responses.forEach(function(res){
		res.send(messages+'<script>setTimeout(function(){window.location.reload()})</script>');
	});
	res.send('tu mensaje es '+ req.params.message);
});
*/
server.listen(3000);