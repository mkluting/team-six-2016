// Kenny wants to push

var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

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
