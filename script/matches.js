var BASEURL = '/api/';
var Matches = Object.create({
        _matches: [],
        init: function (matches) {
            var arr = [];
            discussions.map(function (match) {
                arr.push(Object.create(Match).init(match));
            });
            this._matches = arr;
            return this;
        },
        getById: function (id) {
            for (var k in this._matches) {
                if (this._matches[k].get('_id') === id)
                    return this._matches[k];
            }
        },
        get: function (index) {
            return this._matches[index];
        },
        render: function () {
            var elements = [];
            this._matches.map(function (match) {
                elements.push(match.render());
            });
            return elements;
        },
        add: function (match) {
            this._discussions.push(match);
        },
        addMultiple: function (matches) {
            this._discussions.concat(matches);
        }
    }),
    Match = Object.create({
        _match: {},
        
        init: function (match) {
            this._match = match;
            /*if (this.get('questions').length && typeof this.get('questions')[0] === 'object') {
                this.initQuestions(this.get('questions'));
            }*/
            return this;
        },
        /*initQuestions: function (questions) {
            this._questions = Object.create(Questions).init(questions);
        },*/
        render: function () {
            var el = $('<div><a href="matches/'+this._match.matchname+'">'+this._match.matchname+'</a></div>'),
                editBtn = $('<a>edit</a>');

            //BIND TO FORCE 'THIS' TO CURRECT DISCUSSION
            //IF NOT THIS WILL REFER THE CLICK EVENT
            editBtn.on('click', this.edit.bind(this));
            el.append(editBtn);
            /*if (this._questions)
                el.append(this._questions.render());*/
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
    //alert("working");
    fetchMatches();
    $('#match__create-btn').on('click', function (e) {
        alert("create");
        e.preventDefault();
        $('#match__create').css('display', 'block');
    });
    $('#match__create').on('submit', function (e) {
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

    })
});

var fetchMatch = function (id) {
    $.ajax({
        url: BASEURL+'matches/'+id,
        method: 'GET',
        dataType: 'json',
        success: function (discussion) {
            objectToRender = Object.create(Match).init(match);
            $('.matches__container').empty();
            $('.matches__container').append(objectToRender.render());
        }
    })
};
var fetchMatches = function () {
    $.ajax({
        url: BASEURL + 'matches/',
        method: 'GET',
        dataType: 'json',
        success: function (matches) {
            console.log(matches);
            objectToRender = Object.create(Matches).init(matches);
            $('.matches__container').empty();
            $('.matches__container').append(objectToRender.render());
        }
    })
};