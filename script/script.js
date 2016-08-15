$( document ).ready(function() {
    var socket = io();
    
    //NEW MATCH
    //TALK TO SERVER
    $('#submitMatch').click(function(e){
        var newMatch = $('#matchName').val();
        socket.emit("New Match", newMatch);
        console.log(newMatch);
        $('#matchName').val("");
        return false;
    })
    
    //TALK TO CLIENT
    socket.on('newMatchInDB', function(newMatchInDB){
        var newMatch = "<a href='/matches/" + newMatchInDB._id + "'><h2 class='match'>" + newMatchInDB.match + "</h2></a>";
        $('.matches').append(newMatch);
    })
    
    
    
    
    
});