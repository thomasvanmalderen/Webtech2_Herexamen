var express = require('express'),
    router = express.Router();
var Match = require('../models/Match');

router.route('/')
    .post(function(req,res){
        var match = new Match();
        match.matchname = req.body.matchname;
        match.country1name = req.body.country1name;
        match.country2name = req.body.country2name;
        match.country1Goals = 0;
        match.country2Goals = 0;
        match.country1Shots = 0;
        match.country2Shots = 0;
        match.country1Fouls = 0;
        match.country2Fouls = 0;
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
    .get(function (req,res){
    
        Match.find()
        .exec(function(error, matches){
            if(error)
                res.send(error);
            res.json(matches);
        })
    })
    
router.route('/:matchname')
    .put(function (req, res) {
        Match.findOne(
            {matchname: req.params.matchname},
            function (error, match) {
                if (error)
                    res.send(error);
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
                    match.save(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message: 'Match updated!', match: match})
                });
            }
        )
    })
    .get(function (req, res) {
        Match
            .findOne({matchname: req.params.matchname})
            .exec(function (error, match) {
                if (error)
                    res.send(error);
                res.json(match);
//                res.render('discussion', {
//                    discussion: discussion
//                });
            })
    })
    .delete(function (req, res) {
        Match
            .findOne({matchname: req.params.matchname})
            .exec(function (error, match) {
                if (error)
                    res.send(error);
                match.remove(function (error) {
                    if (error)
                        res.send(error);
                    res.json({message:'Match deleted!'});
                })
            })
    });

module.exports = router;