var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

router.get('/', function (req, res) {
	res.json({message: 'hello world'});
});

module.exports = router;
