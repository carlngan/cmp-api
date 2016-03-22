"use strict";

module.exports = class Error {

    constructor(code, optParam1, optParam2, optParam3) {

        this.setCode(code);
        this.setError(true);

        switch (code) {
            // DATABASE
            case "DBA001":
                this.msg = "Unable to create in database: " + optParam1;
                break;
            case "DBA002":
                this.msg = "Unable to find in database: " + optParam1;
                break;
            case "DBA003":
                this.msg = "Unable to update in database: " + optParam1;
                break;
            case "DBA004":
                this.msg = "Unable to delete in database: " + optParam1;
                break;

            // AUTHENTICATION
            case "AUT001":
                this.msg = "Authentication header required.";
                break;
            case "AUT002":
                this.msg = "Authentication header malformed.";
                break;
            case "AUT003":
                this.msg = "Invalid access token (in this case bad username/password).";
                break;
            case "AUT004":
                this.msg = "Unable to authenticate username and password.";
                break;
            case "AUT005":
                this.msg = "Username is required.";
                break;
            case "AUT006":
                this.msg = "Password is required.";
                break;

            // CLAIM
            case "CLA001":
                this.msg = "Claim number required.";
                break;
            case "CLA002":
                this.msg = "Client ID and Client Secret required.";
                break;
            case "CLA003":
                this.msg = "Claim does not exist: " + optParam1;
                break;

            default:
                this.msg = "Unknown error";
        }

    }

    setCode(c) {
        this.code = c;
    }
    getCode() {
        return this.code || "";
    }

    setMsg(m) {
        this.msg = m;
    }
    getMsg() {
        return this.msg || "";
    }

    setError(e) {
        this.error = e;
    }
    isError() {
        return this.error;
    }

};
