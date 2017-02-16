var express = require('express');
var ajax = require('../../../config/express/ajax.js');

var router = express.Router();

console.log(__dirname + '/index.html')
router.get('/index', function(req, res, next){
	/*ajax.get({
		url: 'http://api.k.sohu.com/api/search/v6/hotwords.go',
		param: {
			a: 1,
			b: '二'
		},
		success: function(data){
			console.log(data);
			//res.render('dev/page/test2/test2.html', data);
			res.render('page/test2/test2.html', data);
		}
	});*/
	console.log(`${__dirname}/index.html`);
	res.render(`${__dirname}/index.html`);
});

module.exports = router;
