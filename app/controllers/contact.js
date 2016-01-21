var nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport');

var contactController = function (server){
	console.log('contactController has been initialized');
	/*INICIA MIDDLEWARES*/
	/*FINALIZA MIDDLEWARES*/

	/*INICIA RUTAS*/
	server.get('/contact', function (req, res){
		res.render('contact');
	});

	server.post('/mail-us', function (req, res){
		//debugger;
		//var transporter = nodemailer.createTransport('smtps://terepaimagroup%40gmail.com:Apescape16@smtp.gmail.com');
		try{
			var transporter = nodemailer.createTransport({
				service:'godaddy',
				auth:{
					user:'support@gterepaima.com',
					pass:'support123'
				}
			});
			if(req.body.name != '' && req.body.coment != ''){
				transporter.sendMail({
					from: 'support@gterepaima.com',
					to:'sponce@terepaimagroup.com',
					subject:'WebPage - Mailed by: '+req.body.name+' ('+req.body.email+')',
					text:req.body.coment
				}, function (err, resp){ 
					if(err){
						return console.log(err);
					}
					console.log('Mensaje Enviado: '+resp.response);
					transporter.close();
				});
			}else{
				throw new Error('Uno de los campos esta vacio..');
			}
		}catch(err){
			console.log('Mailing Error: '+err.message);
		}finally{
			res.render('contact');
		}
	});
	/*FINALIZA RUTAS*/
};

module.exports = contactController;