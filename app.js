var dotenv = require('dotenv');
dotenv.load();
var environment = process.env.NODE_ENV;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var configDB = require('./config/database.json')[environment];

var app = express();

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

//app.use('/claims', require('./modules/claims/api/claims.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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
