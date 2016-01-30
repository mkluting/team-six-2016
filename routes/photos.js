// Contributors:
// Aaron Taylor Kelsey
// Reece Boyd

var express = require('express');
var router = express.Router();
var connection = require('../config/db');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/voyage';

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

// read
router.get('/:id', function (req, res) {
	var photoId = req.params.id;
	MongoClient.connect(url, function(err, db) {
 		assert.equal(null, err);
  		res.send("Connected correctly to server.");
  		db.close();
	});
});

module.exports = router;
