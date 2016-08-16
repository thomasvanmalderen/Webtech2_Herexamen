$( document ).ready(function() {
    var socket = io.connect('http://localhost:3000');
    
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
        socket.emit("client_NewMatch", data);
        console.log(data);
        $('#matchName').val("");
        $('#country1Name').val("");
        $('#country2Name').val("");
        return false;
    }})
    
    //TALK TO CLIENT
    socket.on('server_newMatch', function(match){
        alert("socket new match");
        /*var newMatch = "<a href='/matches/" + newMatchInDB._id + "'><h2 class='match'>" + newMatchInDB.match + "</h2></a>";*/
        /*var match = document.createElement("a");
        match.setAttribute("href", newMatch._id);
        match.text = newMatch.matchname;*/
        var Newmatch = "<a href='/matches/" + match._id + "'><h2 class='match'>" + match.matchname + "</h2></a>";
        $('.matches').append(Newmatch);
    })
    
    
    
    
    
});