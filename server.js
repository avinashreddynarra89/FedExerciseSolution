/*jslint node: true */
"use strict";

var express = require('express');
var compression = require('compression');
var app = express();



app.use(compression());

app.use('/', express.static(__dirname + '/source/'));
app.use('/', express.static(__dirname + '/static_content/'));


app.get('/config', function(req, res) {

    var config = process.env.config;
    config = JSON.parse(config);
    res.json(config);

});


var port = process.env.PORT || 3000;

var webServer = app.listen(port, function() {
	console.log('Listening on port %d', webServer.address().port);
});
