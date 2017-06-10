var express = require("express");
var app = express();
var hostname = '127.0.0.1',
    port = 80;
require('./routes')(app);
const pug = require('pug'); // database setup for mysq, need a setup

app.engine('html', require('pug').renderFile);

app.set('view engine', 'pug');

app.use(express.static('staticFolder')); // static folder for music files
var server = app.listen(port, function() {
    console.log("Example app listening at http://%s:%s", hostname, port);
});
