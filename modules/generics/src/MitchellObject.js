"use strict";
const lang = require('lodash/lang');

module.exports = class MitchellObject {

    constructor(o) {

        //if an id was passed in
        if (lang.isString(o) || (lang.isObject(o) && o._bsontype == "ObjectID")) {
            this.id = o;
            this.setInDatabase(true);
            this.setPopulated(false);
        }
        //if an object was passed in
        else if (lang.isObject(o)) {
            if (o._id) {
                this.setId(o._id);
                this.setInDatabase(true);
            }
            else if (o.id) {
                this.setId(o.id);
                this.setInDatabase(true);
            }
            else{
                this.setInDatabase(false);
            }
            if (o.timeStamp) {
                this.setTimeStamp(o.timeStamp);
            }
            this.setPopulated(true);
        }
        //if nothing was passed in
        else {
            this.setInDatabase(false);
            this.setPopulated(false);
        }
    }

    setId(i) {
         this.id = i;
    }
    getId() {
        return this.id;
    }

    setTimeStamp(t) {
        this.timeStamp = t;
    }
    getTimeStamp() {
        return this.timeStamp;
    }

    setPopulated(b) {
        this.populated = b;
    }
    isPopulated() {
        return this.populated || false;
    }

    setInDatabase(b) {
        this.inDatabase = b;
    }
    isInDatabase() {
        return this.inDatabase || false;
    }

};
