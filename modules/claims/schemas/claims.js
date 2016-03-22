"use strict";
// load the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for our user model
var claimsSchema = mongoose.Schema({
    claimNumber: String,
    claimantFirstName: String,
    claimantLastName: String,
    status: String,
    lossDate: Date,
    lossInfo: {
        causeOfLoss: String,
        reportedDate: Date,
        lossDescription: String
    },
    assignedAdjusterID: Number,
    vehicles: [{
        modelYear: Number,
        makeDescription: String,
        modelDescription: String,
        engineDescription: String,
        exteriorColor: String,
        vin: String,
        licPlate: String,
        licPlateState: String,
        licPlateExpDate: Date,
        damageDescription: String,
        mileage: Number
    }],
    xml:{
        data: String,
        file: String
    },
    json: {
        data: String,
        file: String
    },
    timeStamp: {
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    }
}, {
    id: true,
    collection: "claims"
});

claimsSchema.pre('save', function(next) {
    this.timeStamp.updated = new Date();
    next();
});

// create the model for sites and expose it to our app
module.exports = mongoose.model('claims', claimsSchema);
