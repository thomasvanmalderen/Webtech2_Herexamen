// WEBTECH 2 Herexamen (Thomas Van Malderen)  - IMD FOOTBALL

//REQUIRE MODULES
var express = require('express');
var app = express();
var md5 = require('js-md5');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var controller = require('./controllers/matches');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//CONNECT TO DATABASE
mongoose.connect('mongodb://localhost:27017/Football');


app.use(bodyParser.json());
app.set('view engine', 'pug');


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
        io.emit("addedc1goal", returnMatch);
        });
    });
    socket.on("c1minusgoal", function(updateMatch){
        controller.c1minusGoal(updateMatch, function(returnMatch){
        io.emit("removedc1goal", returnMatch);
        });
    });
    //COUNTRY 2 GOALS
    socket.on("c2plusgoal", function(updateMatch){
        controller.c2plusGoal(updateMatch, function(returnMatch){
        io.emit("addedc2goal", returnMatch);
      });
    });
    socket.on("c2minusgoal", function(updateMatch){
        controller.c2minusGoal(updateMatch, function(returnMatch){
        io.emit("removedc2goal", returnMatch);
        });
    });
    
    //COUNTRY 1 SHOTS
    socket.on("c1plusshot", function(updateMatch){
        controller.c1plusShot(updateMatch, function(returnMatch){
        io.emit("addedc1shot", returnMatch);
        });
    });
    socket.on("c1minusshot", function(updateMatch){
        controller.c1minusShot(updateMatch, function(returnMatch){
        io.emit("removedc1shot", returnMatch);
        });
    });
    //COUNTRY 2 SHOTS
    socket.on("c2plusshot", function(updateMatch){
        controller.c2plusShot(updateMatch, function(returnMatch){
        io.emit("addedc2shot", returnMatch);
        });
    });
    socket.on("c2minusshot", function(updateMatch){
        controller.c2minusShot(updateMatch, function(returnMatch){
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
    
    //MATCH COMMENTARY
    socket.on("updatecommentary", function(updateMatch){
        controller.updateCommentary(updateMatch, function(returnMatch){
        io.emit("updatedcommentary", returnMatch);
        });
    });
    
    socket.on("unlock", function(tohash){
        console.log("unlock");
        console.log(tohash);
       if(md5(tohash) == '8d9f1681272ed981448e1afa0dc92335'){
           console.log("unlocked");
           io.emit("unlockedmanage");
       }
    });
    socket.on("unlockcreate", function(tohash2){
        console.log("unlocking");
        console.log(tohash2);
       if(md5(tohash2) == '8d9f1681272ed981448e1afa0dc92335'){
           console.log("unlocked");
           io.emit("unlockedmanage2");
       }
    });
});

// APP ACTIVATION
http.listen(3000, function(){
  console.log('App working on port 3000');
});