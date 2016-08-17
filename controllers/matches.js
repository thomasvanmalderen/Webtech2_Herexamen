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

function update (data, Updatematch){

    console.log('Updated match');
	// save a new instance of this model
    Match.findOne({'_id': id}, function(err, match){
        if(err){
            console.log(match);
        }
        json.match = match;
        json.match.matchname = data.matchname;
        json.match.country1name = data.country1name;
        json.match.country2name = data.country2name;
        json.match.country1Goals = data.country1Goals;
        json.match.country2Goals = data.country2Goals;
        json.match.country1Shots = data.country1Shots;
        json.match.country2Shots = data.country2shots;
        json.match.country1Fouls = data.country1Fouls;
        json.match.country2Fouls = data.country1Fouls;
        
        json.match.save(function (err, match) {
	       if (err) return console.error(err);
            console.log("Saved " + match);
            Updatematch(json.match);
	   });
    });
    
	
}

module.exports.update = update;

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