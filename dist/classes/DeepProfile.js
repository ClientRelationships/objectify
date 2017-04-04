"use strict";
var DeepProfile = (function () {
    function DeepProfile(deepProfileId, status, statisticId, whenUnprocessed, whenProcessed, source, converterId, creeperId, creeperActionId, creeperQuality, feedbackHash, feedbackIsAnonymous, feedbackIsSubscribed) {
        if (status === void 0) { status = "dont-process"; }
        if (statisticId === void 0) { statisticId = null; }
        if (whenUnprocessed === void 0) { whenUnprocessed = ""; }
        if (whenProcessed === void 0) { whenProcessed = ""; }
        if (source === void 0) { source = null; }
        if (converterId === void 0) { converterId = null; }
        if (creeperId === void 0) { creeperId = null; }
        if (creeperActionId === void 0) { creeperActionId = null; }
        if (creeperQuality === void 0) { creeperQuality = 0; }
        if (feedbackHash === void 0) { feedbackHash = null; }
        if (feedbackIsAnonymous === void 0) { feedbackIsAnonymous = 0; }
        if (feedbackIsSubscribed === void 0) { feedbackIsSubscribed = 1; }
        this.deepProfileId = deepProfileId;
        this.status = status;
        this.statisticId = statisticId;
        this.whenUnprocessed = whenUnprocessed;
        this.whenProcessed = whenProcessed;
        this.source = source;
        this.converterId = converterId;
        this.creeperId = creeperId;
        this.creeperActionId = creeperActionId;
        this.creeperQuality = creeperQuality;
        this.feedbackHash = feedbackHash;
        this.feedbackIsAnonymous = feedbackIsAnonymous;
        this.feedbackIsSubscribed = feedbackIsSubscribed;
    }
    DeepProfile.prototype.setField = function (region, key, value) {
        this[(region + "_" + key)] = value;
    };
    DeepProfile.prototype.getField = function (region, key) {
        return this[(region + "_" + key)];
    };
    DeepProfile.prototype.toString = function () {
        return this.source + " (ID " + this.deepProfileId + ")";
    };
    DeepProfile.prototype.getName = function () {
        var feedbackFirstName = this.getField("feedback", "firstName");
        var feedbackLastName = this.getField("feedback", "lastName");
        if (this.feedbackIsAnonymous) {
            return "? (Anonymous)";
        }
        if (feedbackFirstName && !feedbackLastName) {
            return feedbackFirstName;
        }
        if (feedbackFirstName && feedbackLastName) {
            return feedbackFirstName + " " + feedbackLastName;
            ;
        }
        return "<No Name>";
    };
    return DeepProfile;
}());
exports.__esModule = true;
exports["default"] = DeepProfile;
