var express = require('express');
var router = express.Router();
var controller = require('../controllers/matches')

// todo, move this to the controller
router.get('/', function (req, res) {
    controller.getAll(req, res);
});

router.get('/:id', function (req, res) {
    //PARAMS: uit url
	console.log(req.params.id);
    controller.getMatch(req, res, req.params.id);
	
});

module.exports = router;