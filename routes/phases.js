// Kenny wants to push

var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.use(function(req, res, next) {
	//This will be run before any endpoint function
	next();
});

// get
router.get('/:id', function (req, res) {
        //res.json({message: 'hello world'});
	var datId = req.params.id;
        connection.query('SELECT DISTINCT p.id AS id, p.name AS p_name, p.sort AS p_sort, d.id as d_id, d.phase_id AS d_phaseid, d.name AS d_name, d.distance AS d_distance, d.dest_photo AS d_destphoto, d.map_photo AS d_map_photo, d.voyage_desc AS d_voyage_desc, d.dest_desc AS d_dest_desc, d.arrival_date AS d_arrival_date, d.departure_date AS d_departure_date, d.sort AS d_sort FROM phases p, destinations d WHERE p.id = d.phase_id ORDER BY p.sort'
, function (err, rows, fields) {
	var my_phase = {};
	var found = false; //when the correct phase is found switch to true
     if (err) throw err;
	for(var row in rows){
	   if( !(found) && (rows[row].id == datId)) {
	       //phaseIds.push(rows[row].id);
	       my_phase.id = rows[row].id;
               my_phase.name = rows[row].p_name;
	       my_phase.sort = rows[row].p_sort;
	       my_phase.destinations = [];
	    	//for each in destinations
    		for (var dest in rows){
                    if(rows[dest].id == my_phase.id){
		        var my_dest = {};
		        my_dest.id = rows[dest].d_id;
		        my_dest.name = rows[dest].d_name;
		        my_dest.distance = rows[dest].d_distance;
		        my_dest.dest_photo = rows[dest].d_destphoto;
		        my_dest.map_photo = rows[dest].d_map_photo;
		        my_dest.voyage_desc = rows[dest].d_voyage_desc;
		        my_dest.dest_desc = rows[dest].d_dest_desc;
		        my_dest.arrival_date = rows[dest].d_arrival_date;
		        my_dest.departure_date = rows[dest].d_departure_date;
		        my_dest.sort = rows[dest].d_sort;
		        my_phase.destinations.push(my_dest);
                    }
                }
                found = true;
	   }
	}
	res.json(my_phase);
        });
});

//Saving this in case I balls this up -jeff zotz
/*
router.get('/:id', function (req, res) {
        //res.json({message: 'hello world'});
        var datId = req.params.id;
        connection.query('SELECT * FROM phases  WHERE id = '+ datId +';', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
        });
});
*/

router.get('/', function (req, res) {
        connection.query('SELECT DISTINCT p.id AS id, p.name AS p_name, p.sort AS p_sort, d.id as d_id, d.phase_id AS d_phaseid, d.name AS d_name, d.distance AS d_distance, d.dest_photo AS d_destphoto, d.map_photo AS d_map_photo, d.voyage_desc AS d_voyage_desc, d.dest_desc AS d_dest_desc, d.arrival_date AS d_arrival_date, d.departure_date AS d_departure_date, d.sort AS d_sort FROM phases p, destinations d WHERE p.id = d.phase_id ORDER BY p.sort'
, function (err, rows, fields) {
   	var data = [];
	var phaseIds = [];

     if (err) throw err;
	for(var row in rows){
	   if(phaseIds.indexOf(rows[row].id) == -1) {
	       phaseIds.push(rows[row].id);
	       var my_phase = {};
	       my_phase.id = rows[row].id;
               my_phase.name = rows[row].p_name;
	       my_phase.sort = rows[row].p_sort;
	       my_phase.destinations = [];
	    	//for each in destinations
    		for (var dest in rows){
                    if(rows[dest].id == my_phase.id){
		        var my_dest = {};
		        my_dest.id = rows[dest].d_id;
		        my_dest.name = rows[dest].d_name;
		        my_dest.distance = rows[dest].d_distance;
		        my_dest.dest_photo = rows[dest].d_destphoto;
		        my_dest.map_photo = rows[dest].d_map_photo;
		        my_dest.voyage_desc = rows[dest].d_voyage_desc;
		        my_dest.dest_desc = rows[dest].d_dest_desc;
		        my_dest.arrival_date = rows[dest].d_arrival_date;
		        my_dest.departure_date = rows[dest].d_departure_date;
		        my_dest.sort = rows[dest].d_sort;
		        my_phase.destinations.push(my_dest);
                    }
                }
           data.push(my_phase);
	   }
	}
	res.json(data);
        });
});

// add
router.post('/', function (req, res) {
        connection.query('INSERT INTO attractions SET ?', req.body, function(err, result) {
                if (err) throw err;
                var returnObject = {'created':true};
                res.json(returnObject);
        });
});

// delete
router.delete('/:id', function (req, res) {
        //res.json({message: 'hello world'});
	var datId = req.params.id;
	connection.query('DELETE FROM phases WHERE id ='+ datId +';', function(err, result){
		if (err) throw err;
		var returnObject = {'deleted':true}
		res.json(returnObject);
	});
});

// update phase sort orders
// I'm expecting this object  {'phase_id': 'sort_number'}
/*
    {'1': '7', '2': '3'}
*/
router.post('/phase_sort', function (req, res) {
    var phases = req.body;
    var keys = Object.keys(phases);
    for (var item in keys) {
        connection.query('UPDATE phases SET sort=' + phases[keys[item]] + ' WHERE id=' + keys[item], function(err, result) {
            if (err) throw err;
        });
    }
    res.status(200).send();
});

module.exports = router;
