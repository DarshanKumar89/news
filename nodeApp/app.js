/**
 * Main application file
 */

'use strict';

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var config = require('./config/environment');
var admin = require("firebase-admin");

require('./config/express')(app);
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

var controller = require('./api/controller/callFirebaseService');
controller.callFirebaseApi();


exports = module.exports = app;
