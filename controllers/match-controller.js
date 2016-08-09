var express = require('express'),
    router = express.Router();
var Match = require('../models/Match');

router.route('/')
    .post(function(req,res){
        var match = new Match();
        match.matchname = req.body.matchname;
        match.country1name = req.body.country1name;
        match.country2name = req.body.country2name;
        match.country1Goals = req.body.country1Goals;
        match.country2Goals = req.body.country2Goals;
        match.country1Shots = req.body.country1Shots;
        match.country2Shots = req.body.country2Shots;
        match.country1Fouls = req.body.country1Fouls;
        match.country2Fouls = req.body.country2Fouls;
        match.commentary = req.body.commentary;
    Match.findOne({matchname: match.matchname}).exec(function(error, existingMatch){
        if (error)
                res.send(error);
            if (!existingMatch) {
                match.save(function (error, match) {
                    if (error)
                        res.send(error);
                    res.json({message: 'Match created!', match: match})
                });
            }
            else {
                res.send('Match already exists!')
            }
    })
})