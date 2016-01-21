var models = require('./models'),
	Schema = models.Schema;

var authUserSchema = Schema({
	username : 'string',
	name	 : 'string',
	password : 'string',
	lastLogin: 'date'
});

var AuthUser = models.model('authuser', authUserSchema);

module.exports = AuthUser;