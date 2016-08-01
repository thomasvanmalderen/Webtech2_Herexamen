var mongoose = require('mongoose');

var MatchSchema = mongoose.Schema({
    
    Matchname: String,
    Country1ID: String,
    Country2ID: String,
    Country1Goals: Number,
    Country2Goals: Number,
    Country1Shots: Number,
    Country2Shots: Number,
    Country1Fouls: Number,
    Country2Fouls: Number,
    commentary: [{
        message: String
    }],
    
});

var Match = mongoose.model('Match', MatchSchema);
module.exports = Match;