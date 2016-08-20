var Match = require('../models/Match');

function create (data, newMatch){
    console.log('Created new match');
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
            message: "No updates yet"
        }]
	});
	match.save(function (err, match) {
	  if (err) return console.error(err);
        console.log("Saved " + match);
        newMatch(match);
	});
}

module.exports.create = create;


// MANAGE GOAL FUNCTIONS===============================================================================================

function c1plusGoal (data1, updateMatch){
    console.log("adding goal");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Goals = data1.country1Goals + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1plusGoal = c1plusGoal;
function c1minusGoal (data1, updateMatch){
    console.log("removing goal");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Goals = data1.country1Goals - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1minusGoal = c1minusGoal;

function c2plusGoal (data1, updateMatch){
    console.log("adding goal");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Goals = data1.country2Goals + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2plusGoal = c2plusGoal;
function c2minusGoal (data1, updateMatch){
    console.log("removing goal");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Goals = data1.country2Goals - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2minusGoal = c2minusGoal;


// MANAGE SHOTS FUNCTIONS============================================================================================================================

function c1plusShot (data1, updateMatch){
    console.log("adding shot");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Shots = data1.country1Shots + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1plusShot = c1plusShot;
function c1minusShot (data1, updateMatch){
    console.log("removing shot");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Shots = data1.country1Shots - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1minusShot = c1minusShot;

function c2plusShot (data1, updateMatch){
    console.log("adding shot");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Shots = data1.country2Shots + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2plusShot = c2plusShot;
function c2minusShot (data1, updateMatch){
    console.log("removing shot");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Shots = data1.country2Shots - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2minusShot = c2minusShot;

// MANAGE FOULS FUNCTIONS ====================================================================================

function c1plusFoul (data1, updateMatch){
    console.log("adding foul");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Fouls = data1.country1Fouls + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1plusFoul = c1plusFoul;
function c1minusFoul (data1, updateMatch){
    console.log("removing foul");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country1Fouls = data1.country1Fouls - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c1minusFoul = c1minusFoul;

function c2plusFoul (data1, updateMatch){
    console.log("adding foul");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Fouls = data1.country2Fouls + 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2plusFoul = c2plusFoul;
function c2minusFoul (data1, updateMatch){
    console.log("removing foul");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.country2Fouls = data1.country2Fouls - 1;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.c2minusFoul = c2minusFoul;

// MANAGE COMMENTARY FUNCTION ====================================================================================

function updateCommentary (data1, updateMatch){
    console.log("updating commentary");
    Match.findOne({'_id': data1._id}, function(err, match){
        if (err) return console.error(err);
        match.commentary = data1.commentary;
        console.log(match);
        match.save();
        updateMatch(match);
    })
}
module.exports.updateCommentary = updateCommentary;

//GET FUNCTIONS
function getAll (req, res) {
	Match.find( function(err, matches){
		if (err) return console.error(err);
        //console.log(matches);
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
		return res.render('match', {match: match});
    }
  )
}

module.exports.getAll = getAll;
module.exports.getMatch = getMatch;