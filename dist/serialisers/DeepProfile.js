"use strict";
var DeepProfile_1 = require("../classes/DeepProfile");
var DeepProfileSerialiser = (function () {
    function DeepProfileSerialiser() {
    }
    DeepProfileSerialiser.prototype.toRaw = function (deepProfile) {
        var raw = JSON.parse(JSON.stringify(deepProfile));
        var creeperKeywords = deepProfile.getField("creeper", "keywords");
        if (creeperKeywords) {
            raw.creeper_keywords = creeperKeywords.toString();
        }
        return raw;
    };
    DeepProfileSerialiser.prototype.fromRaw = function (object) {
        var deepProfile = new DeepProfile_1["default"](object.deepProfileId, object.status, object.statisticId, object.whenUnprocessed, object.whenProcessed, object.source, object.converterId, object.creeperId, object.creeperActionId, object.creeperQuality, object.feedbackHash, object.feedbackIsAnonymous, object.feedbackIsSubscribed);
        var fieldKeys = Object.keys(object).filter(function (key) { return key.indexOf("_") !== -1; });
        fieldKeys.forEach(function (fieldKey) {
            var region = fieldKey.substring(0, fieldKey.indexOf("_"));
            var key = fieldKey.substring(fieldKey.indexOf("_") + 1);
            var value = object[fieldKey];
            if (region === "creeper" && key === "keywords") {
                value = value.toString().split(", ");
            }
            deepProfile.setField(region, key, value);
        });
        return deepProfile;
    };
    return DeepProfileSerialiser;
}());
module.exports = DeepProfileSerialiser;
