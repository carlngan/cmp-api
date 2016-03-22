"use strict";
const lang = require('lodash/lang');

const MitchellObject = require("../../generics/src/MitchellObject"),
    Xml = require("../../generics/src/Xml"),
    Json = require("../../generics/src/Json"),
    Vehicle = require("../../generics/src/Vehicle");

const ClaimLossInfo = require("./ClaimLossInfo");

const Error = require("../../errors/src/Error");

module.exports = class Claim extends MitchellObject {

    constructor(claim) {
        super(claim);

        if (lang.isObject(claim)) {
            
            if (claim.claimNumber) {
                this.setClaimNumber(claim.claimNumber);
            }
            if (claim.claimantFirstName) {
                this.setClaimantFirstName(claim.claimantFirstName);
            }
            if (claim.claimantLastName) {
                this.setClaimantLastName(claim.claimantLastName);
            }
            if (claim.status) {
                this.setStatus(claim.status);
            }
            if (claim.lossDate) {
                this.setLossDate(claim.lossDate);
            }
            if (claim.lossInfo) {
                this.setLossInfo(claim.lossInfo);
            }
            if (claim.assignedAdjusterID) {
                this.setAssignedAdjusterID(claim.assignedAdjusterID);
            }
            if (claim.vehicles) {
                this.setVehicles(claim.vehicles);
            }
            if (claim.xml) {
                this.setXml(claim.xml);
            }
            if (claim.json) {
                this.setJson(claim.json);
            }

        }
    }

    setClaimNumber(c) {
        this.claimNumber = c;
    }
    getClaimNumber() {
        return this.claimNumber;
    }

    setClaimantFirstName(c) {
        this.claimantFirstName = c;
    }
    getClaimantFirstName() {
        return this.claimantFirstName;
    }

    setClaimantLastName(c) {
        this.claimantLastName = c;
    }
    getClaimantLastName() {
        return this.claimantLastName;
    }

    setLossDate(l) {
        this.lossDate = l;
    }
    getLossDate() {
        return this.lossDate;
    }

    setStatus(s) {
        this.status = s;
    }
    getStatus() {
        return this.status;
    }

    setLossInfo(l) {
        this.lossInfo = l instanceof ClaimLossInfo ? l : new ClaimLossInfo(l);
    }
    getLossInfo() {
        return this.lossInfo;
    }

    setAssignedAdjusterID(a) {
        this.assignedAdjusterID = a;
    }
    getAssignedAdjusterID() {
        return this.assignedAdjusterID;
    }

    setVehicles(v) {
        this.vehicles = v.map(function(vehicle) {
            if (vehicle instanceof Vehicle.constructor) {
                return vehicle;
            }
            return new Vehicle(vehicle);
        });
    }
    getVehicles() {
        return this.vehicles;
    }

    setXml(x) {
        this.xml = x instanceof Xml ? x : new Xml(x);
    }
    getXml() {
        return this.xml;
    }

    setJson(j) {
        this.json = j instanceof Json ? j : new Json(j);
    }
    getJson() {
        return this.json;
    }

};
