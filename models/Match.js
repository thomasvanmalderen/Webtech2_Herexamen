// MATCH.JS - Match model for mongoose database

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    
    matchname: String,
    country1name: String,
    country2name: String,
    country1Goals: Number,
    country2Goals: Number,
    country1Shots: Number,
    country2Shots: Number,
    country1Fouls: Number,
    country2Fouls: Number,
    commentary: [{
        message: String
    }],
    
});

var Match = mongoose.model('Match', MatchSchema);
module.exports = Match;