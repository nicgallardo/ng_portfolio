var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
// var Instagram = require('instagram-node-lib');

require('dotenv').config();

process.env.NODE_ENV === 'dev' ? mongoose.connect(database.localUrl) : mongoose.connect(process.env.MONGODB_URI);

// Instagram.set('client_id', 'INSTA_CLIENT_ID');
// Instagram.set('client_secret', 'INSTA_CLIENT_SECRET');

app.use(favicon(__dirname + '/public/favicon.ico')); //
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
require('./app/routes.js')(app);
app.listen(port);
console.log("App listening on port " + port);
