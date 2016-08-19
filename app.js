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
  
    //COUNTRY 1 GOALS
    socket.on("c1plusgoal", function(updateMatch){
      controller.c1plusGoal(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc1goal", returnMatch);
      });
  });
    socket.on("c1minusgoal", function(updateMatch){
      controller.c1minusGoal(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc1goal", returnMatch);
      });
  });
    //COUNTRY 2 GOALS
    socket.on("c2plusgoal", function(updateMatch){
      controller.c2plusGoal(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc2goal", returnMatch);
      });
  });
    socket.on("c2minusgoal", function(updateMatch){
      controller.c2minusGoal(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc2goal", returnMatch);
      });
  });
    
    
    
    //COUNTRY 1 shots
    socket.on("c1plusshot", function(updateMatch){
      controller.c1plusShot(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc1shot", returnMatch);
      });
  });
    socket.on("c1minusshot", function(updateMatch){
      controller.c1minusShot(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc1shot", returnMatch);
      });
  });
    //COUNTRY 2 SHOTS
    socket.on("c2plusshot", function(updateMatch){
      controller.c2plusShot(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc2shot", returnMatch);
      });
  });
    socket.on("c2minusshot", function(updateMatch){
      controller.c2minusShot(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc2shot", returnMatch);
      });
  });
    
    
    
    
    //COUNTRY 1 FOULS
    socket.on("c1plusfoul", function(updateMatch){
      controller.c1plusFoul(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc1foul", returnMatch);
      });
  });
    socket.on("c1minusfoul", function(updateMatch){
      controller.c1minusFoul(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc1foul", returnMatch);
      });
  });
    //COUNTRY 2 FOULS
    socket.on("c2plusfoul", function(updateMatch){
      controller.c2plusFoul(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("addedc2foul", returnMatch);
      });
  });
    socket.on("c2minusfoul", function(updateMatch){
      controller.c2minusFoul(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("removedc2foul", returnMatch);
      });
  });
    
    socket.on("updatecommentary", function(updateMatch){
      controller.updateCommentary(updateMatch, function(returnMatch){
        //console.log(returnMatch);
        io.emit("updatedcommentary", returnMatch);
      });
  });
});

http.listen(3000, function(){
  console.log('App working on port *:3000');
});