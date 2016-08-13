var BASEURL = '/api/';
var adminLoggedin = false;
    Match = Object.create({
        //_match: {},
        _match: [],
       
        init: function (match) {
            
            /*this._match = match;
            /*if (this.get('questions').length && typeof this.get('questions')[0] === 'object') {
                this.initQuestions(this.get('questions'));
            }*/
            var arr = [];
            match.map(function (match) {
                arr.push(Object.create(Match).init(match));
            });
            this._match = arr;
            return this;
        },
        
        render: function () {
            var el = this._match.matchname + ', ' + this._match.country1name;
            //$('<div><a href="matches/'+this._match.matchname+'">'+this._match.matchname+'</a></div>');
            
            return el;
        },
        /*edit: function () {
            var form = $('#match__create');
            form.css('display', 'block');
            if (form) {
                for (var k in this._match) {
                    form.find('input[name="'+k+'"]').val(this._match[k]);
                }
            }
        },*/
        get: function (key) {
            return this._match[key];
        }
    }),
    

    objectToRender = null;

$(document).ready(function () {
    /*if (id) {
        fetchMatch(id);
    }
    else {
        fetchMatches();
    }*/
    //alert("working the page");
    fetchMatch();
    /*$('#match__create-btn').on('click', function (e) {
        alert("create");
        e.preventDefault();
        $('#match__create').css('display', 'block');
    });
    /*$('#match__create').on('submit', function (e) {
        e.preventDefault();
        var form = $(e.target),
            inputs = form.find('input'),
            data = {},
            method,
            url;
        inputs.each(function (index, item) {
            if ($(item).attr('type') !== 'submit')
                data[$(item).attr('name')] = $(item).val();
        });
        if (data._id) {
            method = 'PUT';
            url = BASEURL + 'matches/' + objectToRender.getById(data._id).get('matchname');
        }
        else {
            method = 'POST';
            url = BASEURL + 'matches/';
        }
        $.ajax({
            url,
            method,
            data,
            success: function (data) {
                form.css('display', 'none');
                fetchMatches();
            }
        })

    })*/
});

var fetchMatch = function (id) {
    //alert("fetchmatch");
    //alert("fetching");
    $.ajax({
        url: BASEURL+'matches/'+matchname,
        method: 'GET',
        dataType: 'json',
        success: function (match) {
            objectToRender = Object.create(Match).init(match);
            /*$('.matches__container').empty();
            $('.matches__container').append(objectToRender.render());*/
        }
    })
};
