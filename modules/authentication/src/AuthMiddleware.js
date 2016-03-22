"use strict";

const Error = require("../../errors/src/Error");

module.exports = class AuthMiddleware {

    constructor() {}

    static authenticate() {

        return function(req, res, next) {

            //client id and client secret
            let auth = req.headers.authorization;
            if (!auth) {
                return res.status(500).send(new Error("AUT001"));
            }

            // malformed
            const parts = auth.split(' ');
            if ('bearer' != parts[0].toLowerCase() || !parts[1]) {
                return res.status(500).send(new Error("AUT002"));
            }
            auth = parts[1];

            // credentials
            auth = new Buffer(auth, 'base64').toString();
            auth = auth.match(/^([^:]+):(.+)$/);
            if (!auth) {
                return res.status(500).send(new Error("AUT002"));
            }

            if(auth[1] != "carl" || auth[2] != "ngan"){
                return res.status(500).send(new Error("AUT003"));
            }
            else{
                next();
            }
        };
    }

};
