"use strict";
var DeepProfile_1 = require("../classes/DeepProfile");
var DeepProfileSerialiser = (function () {
    function DeepProfileSerialiser() {
    }
    DeepProfileSerialiser.prototype.toRaw = function (deepProfile) {
        var o = {
            "status": deepProfile.status,
            "whenUnprocessed": deepProfile.whenProcessed,
            "whenProcessed": deepProfile.whenProcessed,
            "source": deepProfile.source,
            "converterId": deepProfile.converterId,
            "creeperId": deepProfile.creeperId,
            "creeperActionId": deepProfile.creeperActionId
        };
        deepProfile.fields.forEach(function (value, key) {
            o[("field" + key)] = value;
        });
        return o;
    };
    DeepProfileSerialiser.prototype.fromRaw = function (object) {
        var deepProfile = new DeepProfile_1["default"](object.deepProfileId, object.status, object.whenUnprocessed, object.whenProcessed, object.source, object.converterId, object.creeperId, object.creeperActionId);
        var fieldKeys = Object.keys(object).filter(function (key) { return key.substring(0, "field".length) === "field"; });
        fieldKeys.forEach(function (key) {
            deepProfile.setField(key.substring("field".length), object[key]);
        });
        return deepProfile;
    };
    return DeepProfileSerialiser;
}());
module.exports = DeepProfileSerialiser;
