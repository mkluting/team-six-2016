// server.js

// BASE SETUP
// =============================================================================
//Respawn ourselves as a daemon
require('daemon')();
console.log('Running as process ' + process.pid);

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var connection = require('./config/db');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var phasesRouter = require('./routes/phases');
var destinationsRouter = require('./routes/destinations');
var attractionsRouter = require('./routes/attractions');
var photosRouter = require('./routes/photos');

//app.use('/api', router);
app.use('/phases', phasesRouter);
app.use('/destinations', destinationsRouter);
app.use('/attractions', attractionsRouter);
app.use('/photos', photosRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
