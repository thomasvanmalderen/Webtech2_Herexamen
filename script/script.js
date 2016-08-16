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
    
    
    
    
    
    
});