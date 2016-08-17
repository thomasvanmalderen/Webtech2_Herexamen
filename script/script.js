$( document ).ready(function() {
    //var socket = io.connect('http://localhost:3000');
    var socket = io();
    
    /*switch($('.country1name').text()){
        case "Belgium":
            $('.country1flag').attr("src", "../flags/Belgium.png"); 
            break;
        case "Ireland":
            //$('.country2name').style.backgroundColor("Red");
            break;
        default:
            $('.country1name').css("background-color", "red");
            break;
            
    }*/
   
    
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
    
    
    // UPDATE MATCH
    /*$('#updateMatch').click(function(e){
        
        var data = {
            //matchname: $('#matchName').val(),
            
            country1name: $('#country1Name').val(),
            country2name: $('#country2Name').val(),
            country1Goals: $('#country1goals').val(),
            country2Goals: $('#country2goals').val(),
            country1Shots: $('#country1shots').val(),
            country2Shots: $('#country2shots').val(),
            country1Fouls: $('#country1fouls').val(),
            country2Fouls: $('#country2fouls').val(),
        };
        
        socket.emit("Update Match", data);
        console.log("mottie" + data);
        
        return false;
    })
    
    socket.on('updateMatchInDB', function(updateMatchInDB){
        console.log("kappa" + updateMatchInDB);
        //var newMatch = "<a href='/matches/" + newMatchInDB._id + "'><h2 class='match'>" + newMatchInDB.matchname + "</h2></a>";
        //$('.matches').append(newMatch);
    });
    
    */
    
    
});