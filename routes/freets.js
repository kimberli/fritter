var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Freet = require('../models/Freet');

router.get('/', function(req, res) {
    Freet.getFreets(function(err,result) {
        utils.sendSuccessResponse(res, result);
    });
});

router.get('/:fid', function(req, res) {
    Freet.getFreetById(req.params.fid, function(err,result) {
        console.log(req.params.fid);
        if (err) {
            utils.sendErrResponse(res, 403, err);
        } else {
            console.log(result);
            utils.sendSuccessResponse(res, result);
        }
    });
});

router.post('/add', function(req, res) {
    Freet.addFreet(req.currentUser.username, req.body.freet, Date.now(), function(err, result) {
        if (err) {
            utils.sendErrResponse(res, 403, err);
        } else {
            utils.sendSuccessResponse(res, result);
        }
    });
})

router.post('/delete', function(req, res) {
    Freet.deleteFreetById(req.currentUser.username, req.body.freetId, function(err, result) {
        if (err) {
            utils.sendErrResponse(res, 403, err);
        } else {
            utils.sendSuccessResponse(res, result);
        }
    });
})

module.exports = router;