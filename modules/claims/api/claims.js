"use strict";
const express = require('express'),
    router = express.Router();

const ClaimFactory = require('../src/ClaimFactory');
const Error = require("../../errors/src/Error");
const AuthMiddleware = require("../../authentication/src/AuthMiddleware");

// *************************************************************************
// **************************** Public Methods *****************************
// *************************************************************************

// =========================================================================
// GET - /claims/count
// =========================================================================
// Get the number of claims given the search criteria.
router.get('/count', AuthMiddleware.authenticate(), function(req, res) {
    ClaimFactory.getCount({
        search: req.query.search,
        rangeStart: req.query.rangeStart,
        rangeEnd: req.query.rangeEnd,
        status: req.query.status
    }, function(err, count) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(count);
        }
    });
});

// =========================================================================
// POST - /claims/validate
// =========================================================================
// validate XML against XSD
router.post('/validate', AuthMiddleware.authenticate(), function(req, res) {
    ClaimFactory.validateXml({
        xmlContent: req.body.xmlContent
    }, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// =========================================================================
// GET - /claims
// =========================================================================
// Get claims based on query parameters. If id is passed in, 1 result is returned, otherwise an array is returned
router.get('/', AuthMiddleware.authenticate(), function(req, res) {
    if (req.query.id) {
        ClaimFactory.findById(req.query.id, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    }
    else if (req.query.claimNumber) {
        ClaimFactory.findByClaimNumber(req.query.claimNumber, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    }
    else {
        ClaimFactory.find({
            include: req.query.include,
            exclude: req.query.exclude,
            paginate: req.query.paginate,
            perPage: req.query.perPage,
            page: req.query.page,
            sort: req.query.sort,
            sortBy: req.query.sortBy,
            search: req.query.search,
            rangeStart: req.query.rangeStart,
            rangeEnd: req.query.rangeEnd,
            status: req.query.status
        }, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    }
});


// =========================================================================
// POST - /claims
// =========================================================================
// Creates a new claim
router.post('/', AuthMiddleware.authenticate(), function(req, res) {

    if (!req.body.claimNumber) {
        return res.status(500).send(new Error("CLA001"));
    }

    ClaimFactory.create({
        claimNumber: req.body.claimNumber,
        claimantFirstName: req.body.claimantFirstName,
        claimantLastName: req.body.claimantLastName,
        status: req.body.status,
        lossDate: req.body.lossDate,
        lossInfo: req.body.lossInfo,
        assignedAdjusterID: req.body.assignedAdjusterID,
        vehicles: req.body.vehicles,
        xml: req.body.xml,
        json: req.body.json
    }, function(err, claim) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(claim);
        }
    });
});

// =========================================================================
// PUT - /claims/:claimId
// =========================================================================
// Updates a claim
router.put('/:claimId', AuthMiddleware.authenticate(), function(req, res) {

    if (!req.body.claimNumber) {
        return res.status(500).send(new Error("CLA001"));
    }

    ClaimFactory.update({
        id: req.params.claimId,
        claimNumber: req.body.claimNumber,
        claimantFirstName: req.body.claimantFirstName,
        claimantLastName: req.body.claimantLastName,
        status: req.body.status,
        lossDate: req.body.lossDate,
        lossInfo: req.body.lossInfo,
        assignedAdjusterID: req.body.assignedAdjusterID,
        vehicles: req.body.vehicles,
        xml: req.body.xml,
        json: req.body.json
    }, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// =========================================================================
// DELETE - /claims/:claimId
// =========================================================================
// deletes a claim
router.delete('/:claimId', AuthMiddleware.authenticate(), function(req, res) {
    ClaimFactory.delete(req.params.claimId, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).end();
        }
    });
});




module.exports = router;
