var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require("multer");
var pug = require('pug');

var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

mongoose.connect('mongodb://localhost/football');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});