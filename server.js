var express = require("express");
var app = express();
var hostname = '127.0.0.1',
    port = 8090;
require('./routes')(app), // database setup for mongo, need a setup script
    mongoose = require('mongoose');
//    mongoUrl = 'mongodb://localhost/clocks';

/*
mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', function() {
    throw new Error('unable to connect to database at ' + mongoUrl);
});
*/
app.use(express.static('staticFolder')); // static folder for music files

var server = app.listen(port, function() {
    console.log("Example app listening at http://%s:%s", hostname, port);
});
