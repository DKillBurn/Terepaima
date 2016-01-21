var models = require('./models'),
	Schema = models.Schema;

var noticiaSchema = Schema({
	title	: 'string',
	subtitle: 'string',
	date	: 'string',
	details : 'string',
	imgurl	: 'string',
	author	: 'string'
});

var Noticia = models.model('noticia', noticiaSchema);

module.exports = Noticia;