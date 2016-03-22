"use strict";
const lang = require('lodash/lang');

module.exports = class Xml {

    constructor(xml) {
        if (lang.isObject(xml)) {
            if (xml.data) {
                this.setData(xml.data);
            }
            if (xml.file) {
                this.setFile(xml.file);
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
