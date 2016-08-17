var Match = require('../models/Match');

function create (data, newMatch){

    console.log('Created new match');
	// save a new instance of this model
	var match = new Match({
		matchname: data.matchname,
        country1name: data.country1name,
        country2name: data.country2name,
        country1Goals: 0,
        country2Goals: 0,
        country1Shots: 0,
        country2Shots: 0,
        country1Fouls: 0,
        country2Fouls: 0,
        commentary: [{
            message: ""
        }]
	});
    
	match.save(function (err, match) {
	  if (err) return console.error(err);
        console.log("Saved " + match);
        newMatch(match);
	});
}

module.exports.create = create;

//ADD GOAL
function c1plusGoal (data, id){
    console.log("coolie" + data);
    Match.findOne({'_id': id}, function(err, match){
        match.country1Goals = data.match.country1Goals + 1;
    })
}

module.exports.c1plusGoal = c1plusGoal;

function getAll (req, res) {
	Match.find( function(err, matches){
		if (err) return console.error(err);
        console.log(matches);
		return res.render('matches', {matches: matches});
	});
}

function getMatch (req, res, id) {
    var json = {};
    Match.findOne({'_id': id}, function(err, match){
        if(err){
            console.log(match);
        }
        json.match = match;
        console.log('json match=' + json.match);
		console.log('json match.matchname=' + json.match.matchname);
        //console.log(json.match.country1Goals);
		return res.render('match', {match: match});
    }
  )
}

module.exports.getAll = getAll;
module.exports.getMatch = getMatch;