var Match = require('../models/Match');

function create (newMatch, returnMatch){

    console.log('Created new match');
	// save a new instance of this model
	var newMatch = new Match({
		//user: req.body.user,
		match: newMatch
	});
    
    console.log('Match: ' + newMatch);
	
	newMatch.save(function (err, match) {
	  if (err) return console.error(err);
        console.log("Saved " + match);
        returnMatch(match);
	});
}

module.exports.create = create;

function getAll (req, res) {
	Match.find( function(err, matches){
		if (err) return console.error(err);
        console.log(matches);
		return res.render('matches', {matches: matches});
	});
}

function getMatch (req, res, id) {
    var json = {};
    Match.findOne({'matchname': matchname}, 'match matchname', function(err, match){
        if(err){
            console.log(match);
        }
        json.match = match;
        console.log('json match=' + json.match);
		console.log('json match.matchname=' + json.match.matchname);
		
    }
  )
}

module.exports.getAll = getAll;
module.exports.getMatch = getMatch;