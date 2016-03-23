"use strict";
const request = require("supertest"),
    chai = require('chai'),
    should = require('should'),
    fs = require('fs');

const url = "http://localhost:3001";

const credentials = {
    "username": "carl",
    "password": "ngan"
};

var validXmlClaim = fs.readFileSync("./test/claims/create-claim.xml");
var validClaimJson = JSON.parse(fs.readFileSync('./test/claims/validClaim.json', 'utf8'));
let token = "";
let claimId = "";

// =========================================================================
// POST /authentication/token
// =========================================================================
describe("Claims Auth - POST /authentication/token", function () {

    it("Should create a token", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('value');
                token = res.body.value;
                done();
            });
    });
});

// =========================================================================
// POST /claims
// =========================================================================
describe("Claims - POST /claims", function () {

    it("Should create a claim if JSON file is valid", function (done) {
        request(url)
            .post('/claims')
            .set('Authorization', 'Bearer ' + token)
            .send(validClaimJson)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('claimNumber');
                res.body.claimNumber.should.be.equal(validClaimJson.claimNumber);
                claimId = res.body.id;
                done();
            });
    });

});

// =========================================================================
// PUT /claims/:claimId
// =========================================================================
describe("Claims - PUT /claims/:claimId", function () {

    validClaimJson.claimNumber = "1234ABCD";
    it("Should update a claim if JSON object is valid and id is specified", function (done) {
        request(url)
            .put('/claims/'+claimId)
            .set('Authorization', 'Bearer ' + token)
            .send(validClaimJson)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('claimNumber');
                res.body.claimNumber.should.be.equal(validClaimJson.claimNumber);
                done();
            });
    });

});

// =========================================================================
// DELETE /claims/:claimId
// =========================================================================
describe("Claims - DELETE /claims/:claimId", function () {

    it("Should delete a claim if id is specified", function (done) {
        request(url)
            .delete('/claims/'+claimId)
            .set('Authorization', 'Bearer ' + token)
            .send(validClaimJson)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                done();
            });
    });

});
