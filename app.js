var express = require('express');
var app = express();

//SOCKET IO
var http = require('http').Server(app);
var io = require('socket.io')(http);


var controller = require('./controllers/matches');

//BODYPARSER
var bodyParser = require('body-parser');

//MONGOOSE
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Football');

// parse application/json , define this BEFORE adding routes
app.use(bodyParser.json());

//PUG
app.set('view engine', 'pug');

//USE IMAGES ETC
app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('public'));

app.use('/', require('./routers/index'));
app.use('/matches', require('./routers/matches'));

//ALL SOCKETS
io.on('connection', function(socket){
  socket.on("New Match", function(newMatch){
      controller.create(newMatch, function(returnMatch){
        console.log(returnMatch);
        io.emit("newMatchInDB", returnMatch);
      });
  });
  
    socket.on("Update Match", function(updateMatch){
      controller.update(updateMatch, function(returnMatch){
        console.log(returnMatch);
        io.emit("updateMatchInDB", returnMatch);
      });
  });
});

http.listen(3000, function(){
  console.log('App working on port *:3000');
});