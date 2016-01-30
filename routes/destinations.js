var express = require('express');
var router = express.Router()
var connection = require('../config/db');

//contributors: jeff zotz,
//		Robert Smith	


router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

//get all destinations
router.get('/', function (req, res) {
	//res.json({message: 'hello world'});
	connection.query('SELECT * FROM Destinations;', function (err, rows, fields) {
        	if (err) throw err; 
        	res.json(rows);
	});
});

//get single destination
router.get('/:id', function (req, res) {
	//res.json({message: 'hello world'});
	var datId = req.params.id;
	connection.query('SELECT * FROM Destinations WHERE id = '+ datId +';', function (err, rows, fields) {
        	if (err) throw err; 
        	res.json(rows);
	});
});

// create
router.post('/', function (req, res) {
        connection.query('INSERT INTO Destinations SET ?', req.body, function(err, result) {
                if (err) throw err;
                var returnObject = {'created':true};
                res.json(returnObject);
        });
});

// delete
router.delete('/:id', function (req, res) {
	var datId = req.params.id;
	connection.query('DELETE FROM Destinations WHERE id = '+ datId +';', function (err, result) {
        	if (err) throw err;
		var returnObject = {'deleted':true};
        	res.json(returnObject);
        });

});

//modify
router.put('/:id', function (req, res){
	var dataId = req.params.id;
	connection.query('UPDATE Destinations SET ?  WHERE id =' + datId + ';', function (err,result){
		if(err) throw err;
		var returnObject = {'updated':true};
		res.json(returnObject);
	});
});
module.exports = router;
