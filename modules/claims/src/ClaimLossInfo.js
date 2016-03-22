"use strict";
const lang = require('lodash/lang');

module.exports = class ClaimLossInfo {

    constructor(lossInfo) {
        if (lang.isObject(lossInfo)) {
            if (lossInfo.causeOfLoss) {
                this.setCauseOfLoss(lossInfo.causeOfLoss);
            }
            if (lossInfo.reportedDate) {
                this.setReportedDate(lossInfo.reportedDate);
            }
            if (lossInfo.lossDescription) {
                this.setLossDescription(lossInfo.lossDescription);
            }
        }
    }

    setCauseOfLoss(c) {
        this.causeOfLoss = c;
    }
    getCauseOfLoss() {
        return this.causeOfLoss;
    }

    setReportedDate(r) {
        this.reportedDate = r;
    }
    getReportedDate() {
        return this.reportedDate;
    }

    setLossDescription(l) {
        this.lossDescription = l;
    }
    getLossDescription() {
        return this.lossDescription;
    }
};
