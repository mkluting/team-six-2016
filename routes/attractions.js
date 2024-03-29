// Contributors:
// Aaron Taylor Kelsey
// Reece Boyd

var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

// read
router.get('/:id', function (req, res) {

	var attractionId = req.params.id;
	connection.query('select * from attractions where id = ' + attractionId + ';', function(err, rows, fields) {
	if (err) throw err;
	res.json(rows);
	});
});

router.get('/', function (req, res) {
	var destId = req.query.destination_id;
	if (destId) {
	connection.query('select * from attractions where dest_id = ' + destId + ';', function(err, rows, fields) {
	if (err) throw err;
	res.json(rows);
	});
}
});

// create
router.post('/', function (req, res) {
	connection.query('INSERT INTO attractions SET ?', req.body, function(err, result) {
		if (err) throw err;
		var returnObject = {'created':true}
		res.json(returnObject);
	});
});


// delete
router.delete('/:id', function (req, res) {
        var attractionsId = req.params.id;
        connection.query('DELETE FROM attractions WHERE id =' + attractionsId + ';', function(err, result){
        if (err) throw err;
        var returnObject = {'deleted':true}
        res.json(returnObject);
        });
});
// update
router.put('/:id', function (req, res) {
	var attractionId = req.params.id;
	connection.query('UPDATE attractions SET ?  WHERE id = ' + attractionId, req.body, function(err, result){
	if (err) throw err;
	var returnObject = {'updated':true}
	res.json(returnObject);
	});

});

module.exports = router;
