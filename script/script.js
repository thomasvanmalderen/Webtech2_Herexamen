$( document ).ready(function() {
    var socket = io();
    $('.match__manage').hide();
    $('.input').hide();
    //?1mdF0oTb4ll?-8
    
    
    $('#passwordmanage').on('keyup', function(e){
       if(e.keyCode === 13) {
           var tohash = $('#passwordmanage').val();
           socket.emit("unlock", tohash);
       };
     });
    socket.on('unlockedmanage', function(e){
        $('.match__manage').show();
    });
    $('#passwordmanage2').on('keyup', function(e){
       if(e.keyCode === 13) {
           var tohash2 = $('#passwordmanage2').val();
           socket.emit("unlockcreate", tohash2);
       };
     });
    socket.on('unlockedmanage2', function(e){
        $('.input').show();
    });
    
    // CREATE NEW MATCH
    $('#submitMatch').click(function(e){
        if($('#matchName').val() == ""){
            alert("Fill in matchname");
        } else {
        var data = {
            matchname: $('#matchName').val(),
            country1name: $('#country1Name').val(),
            country2name: $('#country2Name').val(),
            
        };
        socket.emit("New Match", data);
        console.log("mottie" + data);
        $('#matchName').val("");
        $('#country1Name').val("");
        $('#country2Name').val("");
        return false;
    }})
    socket.on('newMatchInDB', function(newMatchInDB){
        console.log("kappa" + newMatchInDB);
        var newMatch = "<a href='/matches/" + newMatchInDB._id + "'><h2 class='match__match'>" + newMatchInDB.matchname + "</h2></a>";
        $('.matches').append(newMatch);
    });
 
//====================================================================================================================================
// MANAGE GOALS ======================================================================================================================
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
        $('#country2goals').val(matchinDB.country2Goals);
        $('#matchgoals').text(newresults);
    });
    
//====================================================================================================================================
// MANAGE SHOTS ======================================================================================================================
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
        $('#country1shots').val(matchinDB.country1Shots);
        $('#country1_shots').text(matchinDB.country1Shots);
        $('#country2_shots').text(matchinDB.country2Shots);
    });
    
    $('#country1shotsminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Shots: parseInt($('#country1shots').val()),
        };
        console.log(data1);
        socket.emit("c1minusshot", data1);
    });
    socket.on('removedc1shot', function(matchinDB){
        console.log(matchinDB);
        $('#country1shots').val(matchinDB.country1Shots);
        $('#country1_shots').text(matchinDB.country1Shots);
        $('#country2_shots').text(matchinDB.country2Shots);
    });
    
    //COUNTRY 2
    $('#country2shotsplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Shots: parseInt($('#country2shots').val()),
        };
        console.log(data1);
        socket.emit("c2plusshot", data1);
    });
    socket.on('addedc2shot', function(matchinDB){
        console.log(matchinDB);
        $('#country2shots').val(matchinDB.country2Shots);
        $('#country1_shots').text(matchinDB.country1Shots);
        $('#country2_shots').text(matchinDB.country2Shots);
        
    });

    $('#country2shotsminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Shots: parseInt($('#country2shots').val()),
        };
        console.log(data1);
        socket.emit("c2minusshot", data1);
    });
    
    socket.on('removedc2shot', function(matchinDB){
        console.log(matchinDB);
        $('#country2shots').val(matchinDB.country2Shots);
        $('#country1_shots').text(matchinDB.country1Shots);
        $('#country2_shots').text(matchinDB.country2Shots);
    });
    
//====================================================================================================================================
// MANAGE FOULS ======================================================================================================================
//====================================================================================================================================
    
    $('#country1foulplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Fouls: parseInt($('#country1fouls').val()),
        };
        console.log(data1);
        socket.emit("c1plusfoul", data1);
    });
    socket.on('addedc1foul', function(matchinDB){
        console.log(matchinDB);
        $('#country1fouls').val(matchinDB.country1Fouls);
        $('#country1_fouls').text(matchinDB.country1Fouls);
        $('#country2_fouls').text(matchinDB.country2Fouls);
    });
    
    $('#country1foulminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country1Fouls: parseInt($('#country1fouls').val()),
        };
        console.log(data1);
        socket.emit("c1minusfoul", data1);
    });
    socket.on('removedc1foul', function(matchinDB){
        console.log(matchinDB);
        $('#country1fouls').val(matchinDB.country1Fouls);
        $('#country1_fouls').text(matchinDB.country1Fouls);
        $('#country2_fouls').text(matchinDB.country2Fouls);
    });
    
    //COUNTRY 2
    $('#country2foulplus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Fouls: parseInt($('#country2fouls').val()),
        };
        console.log(data1);
        socket.emit("c2plusfoul", data1);
    });
    socket.on('addedc2foul', function(matchinDB){
        console.log(matchinDB);
        $('#country2fouls').val(matchinDB.country2Fouls);
        $('#country1_fouls').text(matchinDB.country1Fouls);
        $('#country2_fouls').text(matchinDB.country2Fouls);
    });
    
    $('#country2foulminus').click(function(e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        var data1 = {
            _id: id,
            country2Fouls: parseInt($('#country2fouls').val()),
        };
        console.log(data1);
        socket.emit("c2minusfoul", data1);
    });
    socket.on('removedc2foul', function(matchinDB){
        console.log(matchinDB);
        $('#country2fouls').val(matchinDB.country2Fouls);
        $('#country1_fouls').text(matchinDB.country1Fouls);
        $('#country2_fouls').text(matchinDB.country2Fouls);
    });
    
    // UPDATE COMMENTARY
    $('#updatecomm').click(function(e){
           var url = window.location.pathname;
            var id = url.substring(url.lastIndexOf('/') + 1);
            var data1 = {
                _id: id,
                commentary: 
                    {message: $('#commentary').val()},
            };
            console.log(data1);
            socket.emit("updatecommentary", data1);
       
     });
    socket.on('updatedcommentary', function(matchinDB){
        console.log(matchinDB);
        $('#commentary').val(matchinDB.commentary[0].message);
        $('#matchcommentary').text(matchinDB.commentary[0].message);
    });
    
});