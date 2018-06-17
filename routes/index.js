var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	request('https://goes-east-conus.firebaseio.com/.json', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      var info = JSON.parse(body);
	      res.render('index', { title: 'Satellite Directory', data: info });
	    }
	})
});

module.exports = router;
