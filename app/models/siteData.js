var models = require('./models'),
	Schema = models.Schema;

var siteDataSchema = Schema({
	eslogan  : [{s1:'string', s2:'string', s3:'string'}],
	services : [{name:'string',desc:'string', imgurl:'string'}],
	about	 : [{us:'string', mision:'string', misionimgurl:'string', vision:'string', visionimgurl:'string'}]
});

var SiteData = models.model('sitedata', siteDataSchema);

module.exports = SiteData;