// app.js

// BASE SETUP
// =============================================================================

// packages
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/Football'); // connect to our database
var jade    = require('jade');
var Match = require('./models/Match');
var matchController = require('./controllers/match-controller');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*var mongoURI = "mongodb://localhost:27017/Football";
mongoose.connect(mongoURI);*/

app.set('view engine', 'jade');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/matches')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var match = new Match();      // create a new instance of the Bear model
        match.name = req.body.Matchname;  // set the bears name (comes from the request)

        // save the bear and check for errors
        match.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Match created!' });
        });
        
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Match.find(function(err, matches) {
            if (err)
                res.send(err);

            res.json(matches);
        });
    });


// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/matches/:match_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Match.findById(req.params.match_id, function(err, match) {
            if (err)
                res.send(err);
            res.json(match);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Match.findById(req.params.match_id, function(err, match) {

            if (err)
                res.send(err);

            match.name = req.body.name;  // update the bears info

            // save the bear
            match.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Match updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Match.remove({
            _id: req.params.match_id
        }, function(err, match) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App running on port ' + port);