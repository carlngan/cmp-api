"use strict";

const moment = require("moment");
//var xsd = require('libxml-xsd');
const fs = require('fs');
const Claim = require("./Claim");
const ClaimsSchema = require("../schemas/claims");
const Error = require("../../errors/src/Error");

module.exports = class ClaimFactory {

    constructor() {}

    // Pass in queryObj and callback
    static getCount(queryObj, callback) {

        let query = {};
        if (queryObj.search) {
            query.claimantFirstName = {
                $regex: new RegExp(queryObj.search, "i")
            };
        }
        if (queryObj.rangeStart && queryObj.rangeEnd) {
            query.lossDate = {"$gte": moment(queryObj.rangeStart).toISOString() , "$lt": moment(queryObj.rangeEnd).toISOString()};
        }
        if (queryObj.status) {
            query.status = queryObj.status;
        }
        ClaimsSchema.count(query, function(err, count) {
            if (err) {
                return callback(new Error("DBA002", err.message));
            }
            return callback(null, {
                count: count
            });
        });
    }

    // Pass in queryObj and callback
    static validateXml(reqObj, callback) {

        /*xsd.parseFile("./MitchellClaim.xsd", function(err, schema){
            schema.validate(reqObj.xmlContent, function(err, validationErrors){
                if (err) {
                    return callback(err);
                }
                return callback(null, String(validationErrors));

            });
        });*/
    }

    //takes an object of claim, writes to db, and returns a Claim object.
    static create(newObj, callback) {
        const claim = new ClaimsSchema();

        if (newObj.claimNumber) {
            claim.claimNumber = newObj.claimNumber;
        }
        else {
            return callback(new Error("CLA001"));
        }

        if (newObj.claimantFirstName) {
            claim.claimantFirstName = newObj.claimantFirstName;
        }
        if (newObj.claimantLastName) {
            claim.claimantLastName = newObj.claimantLastName;
        }
        if (newObj.status) {
            claim.status = newObj.status;
        }
        if (newObj.lossDate) {
            claim.lossDate = moment(newObj.lossDate);
        }
        if (newObj.lossInfo) {
            if(newObj.lossInfo.reportedDate){
                newObj.lossInfo.reportedDate = moment(newObj.lossInfo.reportedDate);
            }
            claim.lossInfo = newObj.lossInfo;
        }
        if (newObj.assignedAdjusterID) {
            claim.assignedAdjusterID = newObj.assignedAdjusterID;
        }
        if (newObj.vehicles) {
            newObj.vehicles.map(function(vehicle){
                if(vehicle.licPlateExpDate){
                    vehicle.licPlateExpDate = moment(vehicle.licPlateExpDate);
                }
                return vehicle;
            });
            claim.vehicles = newObj.vehicles;
        }
        if (newObj.xml) {
            claim.xml = newObj.xml;
        }
        if (newObj.json) {
            claim.json = newObj.json;
        }

        //@todo make sure claim number is unique

        claim.save(function(err, cbClaim) {
            if (err) {
                callback(new Error("DBA001", err.message));
            } else {
                callback(null, new Claim(cbClaim));
            }
        });
    }

    static update(updateObj, callback) {
        if (!updateObj.claimNumber) {
            return callback(new Error("CLA001"));
        }

        ClaimsSchema.findById(updateObj.id).exec(function(err, claim) {
            if (err) {
                return callback(new Error("DBA003", err.message));
            }
            else if (!claim) {
                return callback(new Error("CLA003", "Claim Number: "+updateObj.claimNumber));
            }
            else {
                claim.claimNumber = updateObj.claimNumber;
                if (updateObj.claimantFirstName) {
                    claim.claimantFirstName = updateObj.claimantFirstName;
                }
                if (updateObj.claimantLastName) {
                    claim.claimantLastName = updateObj.claimantLastName;
                }
                if (updateObj.status) {
                    claim.status = updateObj.status;
                }
                if (updateObj.lossDate) {
                    claim.lossDate = updateObj.lossDate;
                }
                if (updateObj.lossInfo) {
                    if(updateObj.lossInfo.reportedDate){
                        updateObj.lossInfo.reportedDate = moment(updateObj.lossInfo.reportedDate);
                    }
                    claim.lossInfo = updateObj.lossInfo;
                }
                if (updateObj.assignedAdjusterID) {
                    claim.assignedAdjusterID = updateObj.assignedAdjusterID;
                }
                if (updateObj.vehicles) {
                    updateObj.vehicles.map(function(vehicle){
                        if(vehicle.licPlateExpDate){
                            vehicle.licPlateExpDate = moment(vehicle.licPlateExpDate);
                        }
                        return vehicle;
                    });
                    claim.vehicles = updateObj.vehicles;
                }
                if (updateObj.xml) {
                    claim.xml = updateObj.xml;
                }
                if (updateObj.json) {
                    claim.json = updateObj.json;
                }

                //@todo make sure claim number is unique

                claim.save(function(err, cbClaim) {
                    if (err) {
                        callback(new Error("DBA003", err.message));
                    } else {
                        callback(null, new Claim(cbClaim));
                    }
                });
            }
        });
    }

    static delete(claimId, callback) {
        ClaimsSchema.findById(claimId).exec(function(err, claim) {
            if (err) {
                return callback(new Error("DBA004", err.message));
            }
            else if (!claim) {
                return callback(new Error("CLA003", claim));
            }
            else {
                claim.remove(function(err, cbClaim) {
                    if (err) {
                        callback(new Error("DBA004", err.message));
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }

    static findById(id, callback) {
        ClaimsSchema.findById(id).exec(function(err, claim) {
            if (err) {
                callback(new Error("DBA002", err.message));
            } else {
                callback(null, new Claim(claim));
            }
        });
    }

    static findByClaimNumber(claimNumber, callback) {
        ClaimsSchema.findOne({claimNumber: claimNumber}).exec(function(err, claim) {
            if (err) {
                callback(new Error("DBA002", err.message));
            } else {
                callback(null, new Claim(claim));
            }
        });
    }


    static find(params, callback) {
        let select = {};
        if (params.include) {
            const include = params.include.split(",");
            for (let i = 0; i < include.length; i++) {
                select[include[i]] = 1;
            }
        } else if (params.exclude) {
            const exclude = params.exclude.split(",");
            for (let j = 0; j < exclude.length; j++) {
                select[exclude[j]] = 0;
            }
        } else {
            select = {
                name: 1,
                status: 1
            };
        }

        let query = {};
        let paginate = {};
        let sort = {};
        paginate.paginate = params.paginate != "false";
        paginate.perPage = params.perPage ? params.perPage : 20;
        paginate.page = params.page ? params.page : 1;
        sort[params.sortBy ? params.sortBy : "lossDate"] = Number(params.sort) == Number(1) ? 1 : -1;

        if (params.search) {
            query.claimantFirstName = {
                $regex: new RegExp(params.search, "i")
            };
        }
        if (params.rangeStart && params.rangeEnd) {
            query.lossDate = {"$gte": moment(params.rangeStart).toISOString() , "$lt": moment(params.rangeEnd).toISOString()};
        }
        if (params.status) {
            query.status = params.status;
        }

        const schemaQuery = ClaimsSchema.find(query).select(select);

        if (paginate.paginate) {
            schemaQuery.limit(paginate.perPage).skip(paginate.perPage * (paginate.page - 1));
        }

        schemaQuery.sort(sort).exec(function(err, claims) {
            if (err) {
                callback(new Error("DBA002", err.message));
            } else {
                callback(null, claims.map(function(c) {
                    return new Claim(c);
                }));
            }
        });
    }


};
