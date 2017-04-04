"use strict";
var DeepProfile_1 = require("../classes/DeepProfile");
var DeepProfileSerialiser = (function () {
    function DeepProfileSerialiser() {
    }
    DeepProfileSerialiser.prototype.toRaw = function (deepProfile) {
        return JSON.parse(JSON.stringify(deepProfile));
    };
    DeepProfileSerialiser.prototype.fromRaw = function (object) {
        var deepProfile = new DeepProfile_1["default"](object.deepProfileId, object.status, object.statisticId, object.whenUnprocessed, object.whenProcessed, object.source, object.converterId, object.creeperId, object.creeperActionId, object.creeperQuality, object.feedbackHash, object.feedbackIsAnonymous, object.feedbackIsSubscribed);
        var fieldKeys = Object.keys(object).filter(function (key) { return key.indexOf("_") !== -1; });
        fieldKeys.forEach(function (key) {
            deepProfile.setField(key.substring(0, key.indexOf("_")), key.substring(key.indexOf("_") + 1), object[key]);
        });
        return deepProfile;
    };
    return DeepProfileSerialiser;
}());
module.exports = DeepProfileSerialiser;
