$( document ).ready(function() {
    switch($('.country1name').val()){
        case "Belgium":
            $('.country1name').style.backgroundColor("Yellow");
            break;
            case "Ireland":
            $('.country2name').style.backgroundColor("Red");
            break;
    }
}