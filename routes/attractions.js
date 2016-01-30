var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

//Configure the MySQL connection
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1',
        database: 'voyage'
});

// read
router.get('/:id', function (req, res) {
	
	var attractionId = req.params.id;
	connection.query('select * from Attractions where id = ' + attractionId + ';', function(err, rows, fields) {
	if (err) throw err;
	res.json(rows);	
	});
});

router.get('/', function (req, res) {
	var destId = req.query.destination_id;
	if (destId) {
	connection.query('select * from Attractions where dest_id = ' + destId + ';', function(err, rows, fields) {
	if (err) throw err;
	res.json(rows);	
	});
}
});

// create
router.post('/', function (req, res) {
	connection.query('INSERT INTO Attractions SET ?', req.body, function(err, result) {
		if (err) throw err;
		var returnObject = {'created':true}
		res.json(returnObject);	
	});
});


// delete
router.delete('/', function (req, res) {
	res.json({message: 'hello world'});
});

// update
router.put('/', function (req, res) {
	res.json({message: 'hello world'});
});

module.exports = router;
