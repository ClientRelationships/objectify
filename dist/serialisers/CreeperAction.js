"use strict";
var CreeperAction_1 = require("../classes/CreeperAction");
var CreeperActionType_1 = require("../classes/CreeperActionType");
var CreeperActionSerialiser = (function () {
    function CreeperActionSerialiser() {
    }
    CreeperActionSerialiser.prototype.toRaw = function (creeperAction) {
        return {
            "type": creeperAction.type.value,
            "data": creeperAction.data
        };
    };
    CreeperActionSerialiser.prototype.fromRaw = function (object) {
        var id = object.creeperActionId;
        var type = new CreeperActionType_1["default"](object.value);
        var data = object.data;
        return new CreeperAction_1["default"](id, type, data);
    };
    return CreeperActionSerialiser;
}());
module.exports = CreeperActionSerialiser;
