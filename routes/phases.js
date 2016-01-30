// Kenny wants to push

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1',
        database: 'voyage'
});
connection.connect();

router.get('/', function (req, res) {
        //res.json({message: 'hello world'});
        connection.query('SELECT * FROM Phases;', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
        });
});

router.get('/:id', function (req, res) {
        //res.json({message: 'hello world'});
        var datId = req.params.id;
        connection.query('SELECT * FROM Phases  WHERE id = '+ datId +';', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
        });
});

module.exports = router;
