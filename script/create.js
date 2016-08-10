$(document).ready(function() {

    $.getJSON('http://localhost:8080/api/matches', function (data) {
        var items = [];
          $.each( data, function( key, val ) {
            items.push( "<li><a href='match/" + val._id + "'>" + val.matchname + "</a></li>" );
          });

          $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
          }).appendTo( "body" );
    });

    $(function() {
     $('#match').on('keyup', function(e){
       if(e.keyCode === 13) {
           var topic = {topic : $('#match').val()};
            $.ajax({
                type: "POST",
                data : JSON.stringify(topic),
                url: "api/matches",
                contentType: "application/json"
            });
       };
     });
    });
    
});