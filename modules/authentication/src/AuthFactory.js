"use strict";

const AccessToken = require("./AccessToken");
const Error = require("../../errors/src/Error");

module.exports = class AuthFactory {

    constructor() {}

    static logout(deleteObj, callback) {
        callback(null);
    }

    static authenticate(params, callback) {
        if (!params.username) {
            return callback(new Error("AUT005"));
        }
        if (!params.password) {
            return callback(new Error("AUT006"));
        }

        if(params.username != "carl" || params.password != "ngan"){
            return callback(new Error("AUT004"));
        }
        else{
            const token = new Buffer(params.username+":"+params.password).toString('base64');
            callback(null, new AccessToken(token));
        }

    }

};
