var express = require("express");
var bodyParser = require('body-parser');

var hostname = '127.0.0.1',
    port = 80;//remember to change to 80 for QA

const pug = require('pug');
var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

var app = express();
app.engine('html', require('pug').renderFile);
app.set('view engine', 'pug');

app.use(express.static('staticFolder')); // static folder for music files


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded


require('./routes')(app);
var server = app.listen(port, function() {
    console.log("Example app listening at http://%s:%s", hostname, port);
});
