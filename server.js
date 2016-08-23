// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(favicon(__dirname + '/public/favicon.ico')); //
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

//
// {
//   "name": "node-todo",
//   "version": "0.0.1",
//   "description": "Simple todo application.",
//   "main": "server.js",
//   "author": "Scotch",
//   "dependencies": {
//     "body-parser": "^1.4.3",
//     "express": "^4.13.4",
//     "method-override": "^2.1.3",
//     "mongoose": "^4.4.12",
//     "morgan": "^1.1.1"
//   },
//   "scripts": {
//     "start": "node server.js",
//   }
// }
