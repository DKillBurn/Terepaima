var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/'+'groupSite');

module.exports = mongoose;