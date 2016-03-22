"use strict";
const lang = require('lodash/lang');

module.exports = class Json {

    constructor(json) {
        if (lang.isObject(json)) {
            if (json.data) {
                this.setData(json.data);
            }
            if (json.file) {
                this.setFile(json.file);
            }
        }
    }

    setData(d) {
        this.data = d;
    }
    getData() {
        return this.data;
    }

    setFile(f) {
        this.file = f;
    }
    getFile() {
        return this.file;
    }
    
};
