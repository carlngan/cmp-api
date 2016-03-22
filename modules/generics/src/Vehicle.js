"use strict";
const lang = require('lodash/lang');

module.exports = class Vehicle {

    constructor(vehicle) {
        if (lang.isObject(vehicle)) {
            if (vehicle.modelYear) {
                this.setModelYear(vehicle.modelYear);
            }
            if (vehicle.makeDescription) {
                this.setMakeDescription(vehicle.makeDescription);
            }
            if (vehicle.modelDescription) {
                this.setModelDescription(vehicle.modelDescription);
            }
            if (vehicle.engineDescription) {
                this.setEngineDescription(vehicle.engineDescription);
            }
            if (vehicle.exteriorColor) {
                this.setExteriorColor(vehicle.exteriorColor);
            }
            if (vehicle.vin) {
                this.setVin(vehicle.vin);
            }
            if (vehicle.licPlate) {
                this.setLicPlate(vehicle.licPlate);
            }
            if (vehicle.licPlateState) {
                this.setLicPlateState(vehicle.licPlateState);
            }
            if (vehicle.licPlateExpDate) {
                this.setLicPlateExpDate(vehicle.licPlateExpDate);
            }
            if (vehicle.damageDescription) {
                this.setDamageDescription(vehicle.damageDescription);
            }
            if (vehicle.mileage) {
                this.setMileage(vehicle.mileage);
            }
        }
    }

    setModelYear(m) {
        this.modelYear = m;
    }
    getModelYear() {
        return this.modelYear;
    }

    setMakeDescription(m) {
        this.makeDescription = m;
    }
    getMakeDescription() {
        return this.makeDescription;
    }

    setModelDescription(m) {
        this.modelDescription = m;
    }
    getModelDescription() {
        return this.modelDescription;
    }

    setEngineDescription(e) {
        this.engineDescription = e;
    }
    getEngineDescription() {
        return this.engineDescription;
    }

    setExteriorColor(e) {
        this.exteriorColor = e;
    }
    getExteriorColor() {
        return this.exteriorColor;
    }

    setVin(v) {
        this.vin = v;
    }
    getVin() {
        return this.vin;
    }

    setLicPlate(l) {
        this.licPlate = l;
    }
    getLicPlate() {
        return this.licPlate;
    }

    setLicPlateState(l) {
        this.licPlateState = l;
    }
    getLicPlateState() {
        return this.licPlateState;
    }

    setLicPlateExpDate(l) {
        this.licPlateExpDate = l;
    }
    getLicPlateExpDate() {
        return this.licPlateExpDate;
    }

    setDamageDescription(d) {
        this.damageDescription = d;
    }
    getDamageDescription() {
        return this.damageDescription;
    }

    setMileage(m) {
        this.mileage = m;
    }
    getMileage() {
        return this.mileage;
    }

};
