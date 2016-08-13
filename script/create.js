$(document).ready(function() {

    /*$.getJSON('http://localhost:8080/api/matches', function (data) {
        var items = [];
          $.each( data, function( key, val ) {
            items.push( "<li><a href='match/" + val._id + "'>" + val.matchname + "</a></li>" );
          });

          $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
          }).appendTo( "body" );
    });*/

    $(function() {
     $('#countryname2txt').on('keyup', function(e){
       if(e.keyCode === 13) {
           //var matchjson = {matchname : $('#matchnametxt').val()};
           var match2json = {
                "matchname": $('#matchnametxt').val(),
                "country1name": $('#country1nametxt').val(),
                "country2name": $('#country2nametxt').val(),
                "country1Goals": 0,
                "country2Goals": 0,
                "country1Shots": 0,
                "country2Shots": 0,
                "country1Fouls": 0,
                "country2Fouls": 0
            }
           
            $.ajax({
                type: "POST",
                data : match2json,
                url: "api/matches",
                contentType: "application/json"
            });
       };
     });
    });
    
});