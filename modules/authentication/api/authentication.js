const express = require('express');
const router = express.Router();

const Error = require("../../errors/src/Error");

const AuthFactory = require('../src/AuthFactory');

// *************************************************************************
// **************************** Public Methods *****************************
// *************************************************************************
// =========================================================================
// POST - /authentication/token
// =========================================================================
// Retrieves a token from the oauth server
router.post('/token', function(req, res) {

    AuthFactory.authenticate({
        username: req.body.username,
        password: req.body.password
    }, function(err, accessToken) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(accessToken);
        }
    });

});

// =========================================================================
// GET - /authentication/logout ============================================================
// =========================================================================
// Log user out
router.get('/logout', function(req, res) {

    AuthFactory.logout({}, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send();
        }
    });

});

module.exports = router;
