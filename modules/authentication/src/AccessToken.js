"use strict";
const lang = require('lodash/lang');

module.exports = class AccessToken {

    constructor(token) {
        if (token) {
            this.setValue(token);
        }
    }

    setValue(v) {
        this.value = v;
    }
    getValue() {
        return this.value;
    }
};
