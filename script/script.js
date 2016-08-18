$( document ).ready(function() {
    //var socket = io.connect('http://localhost:3000');
    var socket = io();
    
    //NEW MATCH
    //TALK TO SERVER
    $('#submitMatch').click(function(e){
        if($('#matchName').val() == ""){
            alert("Fill in matchname");
        } else {
        var data = {
            matchname: $('#matchName').val(),
            country1name: $('#country1Name').val(),
            country2name: $('#country2Name').val(),
            
        };
        //var newMatch = $('#matchName').val();
        socket.emit("New Match", data);
        console.log("mottie" + data);
        $('#matchName').val("");
        $('#country1Name').val("");
        $('#country2Name').val("");
        return false;
    }})
    
    socket.on('newMatchInDB', function(newMatchInDB){
        console.log("kappa" + newMatchInDB);
        var newMatch = "<a href='/matches/" + newMatchInDB._id + "'><h2 class='match'>" + newMatchInDB.matchname + "</h2></a>";
        $('.matches').append(newMatch);
    });
 
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
    
    //ADD GOALS
    $('#country1goalplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Goals: parseInt($('#country1goals').val()),
        };
        console.log(data1);
        socket.emit("c1plusgoal", data1);
    });
    socket.on('addedc1goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Goals);
        $('#matchgoals').text(newresults);
    });
    
    $('#country1goalminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Goals: parseInt($('#country1goals').val()),
        };
        console.log(data1);
        socket.emit("c1minusgoal", data1);
    });
    socket.on('removedc1goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Goals);
        $('#matchgoals').text(newresults);
    });
    
    //COUNTRY 2
    $('#country2goalplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2plusgoal", data1);
    });
    socket.on('addedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });

    $('#country2goalminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2minusgoal", data1);
    });
    socket.on('removedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });
    
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
    
    
    $('#country1shotsplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Shots: parseInt($('#country1shots').val()),
        };
        console.log(data1);
        socket.emit("c1plusshot", data1);
    });
    socket.on('addedc1shot', function(matchinDB){
        console.log(matchinDB);
        var newresults = "<h4 class='totalshots'><span class='country1span'>" + matchinDB.country1Goals + " </span> Total shots <span class='country1span'>" + matchinDB.country2Goals + "</span>";
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Shots);
        $('#matchgoals').text(newresults);
    });
    
    $('#country1shotsminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Goals: parseInt($('#country1goals').val()),
        };
        console.log(data1);
        socket.emit("c1minusgoal", data1);
    });
    socket.on('removedc1goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Goals);
        $('#matchgoals').text(newresults);
    });
    
    //COUNTRY 2
    $('#country2shotsplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2plusgoal", data1);
    });
    socket.on('addedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });

    $('#country2shotsminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2minusgoal", data1);
    });
    
    socket.on('removedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });
    
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
    
    $('#country1foulplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Goals: parseInt($('#country1goals').val()),
        };
        console.log(data1);
        socket.emit("c1plusgoal", data1);
    });
    socket.on('addedc1goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Goals);
        $('#matchgoals').text(newresults);
    });
    
    $('#country1foulminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Goals: parseInt($('#country1goals').val()),
        };
        console.log(data1);
        socket.emit("c1minusgoal", data1);
    });
    socket.on('removedc1goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country1goals').val(matchinDB.country1Goals);
        $('#matchgoals').text(newresults);
    });
    
    //COUNTRY 2
    $('#country2foulplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2plusgoal", data1);
    });
    socket.on('addedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });

    $('#country2foulminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Goals: parseInt($('#country2goals').val()),
        };
        console.log(data1);
        socket.emit("c2minusgoal", data1);
    });
    
    socket.on('removedc2goal', function(matchinDB){
        console.log(matchinDB);
        var newresults = matchinDB.country1Goals + " - " + matchinDB.country2Goals;
        console.log(newresults);
        //$('#matchgoals').text("");
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });
    
});