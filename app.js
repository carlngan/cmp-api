"use strict";
const dotenv = require('dotenv');
dotenv.load();
const environment = process.env.NODE_ENV;

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const configDB = require('./config/database.json')[environment];

const app = express();

mongoose.connect(configDB.host, configDB.db, configDB.port,
    configDB.credentials,
    function(err) {
        if (err) {
            throw err;
        }
    });

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

/*
@todo validate xml (if any) against xsd in claim
const xsd = require('libxml-xsd');

fs = require('fs');
const schemaStr = fs.readFileSync("./MitchellClaim.xsd");
const claimStr = fs.readFileSync("./create-claim.xml");
xsd.parseFile("./MitchellClaim.xsd", function(err, schema){
    console.log("HELO");
    console.log(schema);
    schema.validateFile("./create-claim.xml", function(err, validationErrors){
        console.log(validationErrors);
        // err contains any technical error
        // validationError is an array, null if the validation is ok
    });
});
*/


app.use('/authentication', require('./modules/authentication/api/authentication'));
app.use('/claims', require('./modules/claims/api/claims'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status(500).send({});
});

module.exports = app;
