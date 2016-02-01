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
	connection.query('SELECT DISTINCT a.id AS a_id, a.name AS a_name, a.cost AS a_cost, a.star_rating AS a_star_rating, a.description AS a_description, a.visit_date AS a_visit_date, a.map_photo AS a_map_photo, a.journal AS a_journal, a.dest_id AS a_dest_id, d.id as d_id, d.phase_id AS d_phaseid, d.name AS d_name, d.distance AS d_distance, d.dest_photo AS d_destphoto, d.map_photo AS d_map_photo, d.voyage_desc AS d_voyage_desc, d.dest_desc AS d_dest_desc, d.arrival_date AS d_arrival_date, d.departure_date AS d_departure_date, d.sort AS d_sort FROM attractions a, destinations d WHERE d.id = a.dest_id ORDER BY d.sort', function (err, rows, fields) {
   	var data = [];
	var destIds = [];

     if (err) throw err;
	for(var dest in rows){
	   if(destIds.indexOf(rows[dest].d_id) == -1) {
	       destIds.push(rows[dest].d_id);
	       var my_dest  = {};
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

    	//for each in destnations
	my_dest.attractions = [];
    		for (var attract in rows){
                    if(rows[attract].d_id == my_dest.id){
		        var my_attract = {};
		        my_attract.id = rows[attract].a_id;
		        my_attract.name = rows[attract].a_name;
		        my_attract.star_rating = rows[attract].a_star_rating;
		        my_attract.description = rows[attract].a_description;
		        my_attract.visit_date = rows[attract].a_visit_date;
		        my_attract.map_photo = rows[attract].a_map_photo;
		        my_attract.journal = rows[attract].a_journal;
		        my_attract.dest_id = rows[attract].a_dest_id;
		        my_dest.attractions.push(my_attract);
                    }
                }
           data.push(my_dest);
	   }
	}
	res.json(data);
        });
});

//saving this just in case -jeff zotz
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

//get single id
router.get('/:id', function (req, res) {
	var datId = req.params.id;
	connection.query('SELECT DISTINCT a.id AS a_id, a.name AS a_name, a.cost AS a_cost, a.star_rating AS a_star_rating, a.description AS a_description, a.visit_date AS a_visit_date, a.map_photo AS a_map_photo, a.journal AS a_journal, a.dest_id AS a_dest_id, d.id as d_id, d.phase_id AS d_phaseid, d.name AS d_name, d.distance AS d_distance, d.dest_photo AS d_destphoto, d.map_photo AS d_map_photo, d.voyage_desc AS d_voyage_desc, d.dest_desc AS d_dest_desc, d.arrival_date AS d_arrival_date, d.departure_date AS d_departure_date, d.sort AS d_sort FROM attractions a, destinations d WHERE d.id = a.dest_id ORDER BY d.sort', function (err, rows, fields) {
     var my_dest  = {};
     var found = false; //when the correct phase is found switch to true
     if (err) throw err;
	for(var dest in rows){
	   if(!(found) && (rows[dest].d_id == datId)) {
	       //destIds.push(rows[dest].d_id);
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

    	//for each in destnations
	my_dest.attractions = [];
    		for (var attract in rows){
                    if(rows[attract].d_id == my_dest.id){
		        var my_attract = {};
		        my_attract.id = rows[attract].a_id;
		        my_attract.name = rows[attract].a_name;
		        my_attract.star_rating = rows[attract].a_star_rating;
		        my_attract.description = rows[attract].a_description;
		        my_attract.visit_date = rows[attract].a_visit_date;
		        my_attract.map_photo = rows[attract].a_map_photo;
		        my_attract.journal = rows[attract].a_journal;
		        my_attract.dest_id = rows[attract].a_dest_id;
		        my_dest.attractions.push(my_attract);
                    }
                }
           	found = true;
	   }
	}
	res.json(my_dest);
        });
});


//get single destination
router.get('/:id', function (req, res) {
	//res.json({message: 'hello world'});
	var datId = req.params.id;
	connection.query('SELECT * FROM destinations WHERE id = '+ datId +';', function (err, rows, fields) {
        	if (err) throw err;
        	res.json(rows);
	});
});

// create
router.post('/', function (req, res) {
        connection.query('INSERT INTO destinations SET ?', req.body, function(err, result) {
                if (err) throw err;
                var returnObject = {'created':true}
                res.json(returnObject);
        });
});

// delete
router.delete('/:id', function (req, res) {
	var datId = req.params.id;
	connection.query('DELETE FROM destinations WHERE id = '+ datId +';', function (err, result) {
        	if (err) throw err;
		var returnObject = {'deleted':true}
        	res.json(returnObject);
        });

});

//modify
router.put('/:id', function (req, res){
	var dataId = req.params.id;
	connection.query('UPDATE destinations SET ?  WHERE id =' + dataId + ';', req.body, function (err,result){
		if(err) throw err;
		var returnObject = {'updated':true};
		res.json(returnObject);
	});
});
module.exports = router;
