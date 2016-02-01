// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var connection = require('./config/db');
var mongo = require('mongodb').MongoClient;

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
app.use('/api/phases', phasesRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/api/attractions', attractionsRouter);
app.use('/api/photos', photosRouter);

// Static files
var serveStatic = require('serve-static')
app.use(serveStatic('static'))

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening for HTTP connections on port ' + port)
