"use strict";
const request = require("supertest"),
    chai = require('chai'),
    should = require('should');

const url = "http://localhost:3001";

const credentials = {
    "valid": {
        "username": "carl",
        "password": "ngan"
    },
    "missingUsername": {
        "password": "ngan"
    },
    "missingPassword": {
        "username": "carl"
    },
    "wrongUsername": {
        "username": "notCarl",
        "password": "ngan"
    },
    "wrongPassword": {
        "username": "carl",
        "password": "somethingelse"
    }
};

// =========================================================================
// POST /authentication/token
// =========================================================================
describe("Authentication - POST /authentication/token", function () {

    it("Should retrieve a token from server if username and password are provider and correct", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials.valid)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('value');
                done();
            });
    });

    it("Should error if username is missing", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials.missingUsername)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 500);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('code');
                res.body.code.should.be.equal("AUT005"); //Username is required.
                done();
            });
    });

    it("Should error if password is missing", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials.missingPassword)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 500);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('code');
                res.body.code.should.be.equal("AUT006"); //Password is required.
                done();
            });
    });

    it("Should error if username is incorrect", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials.wrongUsername)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 500);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('code');
                res.body.code.should.be.equal("AUT004"); //Unable to authenticate username and password.
                done();
            });
    });

    it("Should error if password is incorrect", function (done) {
        request(url)
            .post('/authentication/token')
            .send(credentials.wrongPassword)
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 500);
                res.should.be.json;
                res.body.should.not.be.empty();
                res.body.should.have.property('code');
                res.body.code.should.be.equal("AUT004"); //Unable to authenticate username and password.
                done();
            });
    });

});


// =========================================================================
// GET /authentication/logout
// =========================================================================
describe("Authentication - GET /authentication/logout", function () {

    it("Should return 200 OK regardless and do nothing", function (done) {
        request(url)
            .get('/authentication/logout')
            .end(function (err, res) {
                if (err)
                    throw(err);

                res.should.have.property('status', 200);
                done();
            });
    });

});