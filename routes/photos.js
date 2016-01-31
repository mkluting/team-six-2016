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

var findPhotos = function(db, id, callback) {
	var cursor = db.collection('photos').find( { $where: "this.uuid == " + "'" + id + "'" } );
	cursor.toArray(function (err, photos) {
		if (photos.length) {
			callback(photos[0]);
		} else {	
			callback(null);
		}
	});
};

// read
router.get('/:id', function (req, res) {
	var photoId = req.params.id;
	MongoClient.connect(url, function(err, db) {
 		assert.equal(null, err);
		findPhotos(db, photoId, function(photo) {
  			db.close();
			if (photo) {
				res.json(photo.data);
			} else {
				res.status(404).send('Not found');
			}
		});
	});
});

module.exports = router;
