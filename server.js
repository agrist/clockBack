var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer'); 
var upload = multer(); // for parsing multipart/form-data
var hostname = '127.0.0.1',
    port = 8090;//remember to change to 80 for QA
require('./routes')(app);
const pug = require('pug'); // database setup for mysq, need a setup


app.engine('html', require('pug').renderFile);

app.set('view engine', 'pug');

app.use(express.static('staticFolder')); // static folder for music files
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var server = app.listen(port, function() {
    console.log("Example app listening at http://%s:%s", hostname, port);
});
