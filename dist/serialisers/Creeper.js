"use strict";
var Creeper_1 = require("../classes/Creeper");
var CreeperType_1 = require("../classes/CreeperType");
var CreeperAction_1 = require("../classes/CreeperAction");
var CreeperActionType_1 = require("../classes/CreeperActionType");
var CreeperKeywords_1 = require("../classes/CreeperKeywords");
var CreeperFrequency_1 = require("../classes/CreeperFrequency");
var CreeperHandlesTweetedAt_1 = require("../classes/CreeperHandlesTweetedAt");
var CreeperSerialiser = (function () {
    function CreeperSerialiser() {
    }
    CreeperSerialiser.prototype.toRaw = function (creeper) {
        var object = {};
        if (creeper.name)
            object["name"] = creeper.name;
        object["type"] = creeper.type.value;
        object["keywords"] = creeper.keywords.toString();
        object["isEnabled"] = (creeper.isEnabled === true ? 1 : 0);
        object["isEnabledByUs"] = (creeper.isEnabledByUs === true ? 1 : 0);
        object["actionFrequency"] = creeper.frequency.value;
        object["delay"] = creeper.delay;
        object["handlesTweetedAt"] = creeper.handlesTweetedAt.toString();
        object["converterId"] = creeper.converterId;
        return object;
    };
    CreeperSerialiser.prototype.fromRaw = function (object) {
        var type = new CreeperType_1["default"](object.type);
        var actions = [];
        if (object.actions) {
            actions = object.actions.map(function (action) {
                return new CreeperAction_1["default"](action.creeperActionId, new CreeperActionType_1["default"](action.type), action.data);
            });
        }
        var keywords = new CreeperKeywords_1["default"]();
        keywords.fromString(object.keywords);
        var isEnabled = (object.isEnabled === 1 ? true : false);
        var isEnabledByUs = (object.isEnabledByUs === 1 ? true : false);
        var frequency = new CreeperFrequency_1["default"](object.actionFrequency);
        var delay = object.delay;
        var handlesTweetedAt = new CreeperHandlesTweetedAt_1["default"]();
        handlesTweetedAt.fromString(object.handlesTweetedAt);
        var converterId = object.converterId;
        var creeper = new Creeper_1["default"](object.creeperId, object.name, type, keywords, actions, isEnabled, isEnabledByUs, frequency, delay, handlesTweetedAt, converterId);
        if (object.clientId)
            creeper.setClient({
                "clientId": object.clientId
            });
        return creeper;
    };
    return CreeperSerialiser;
}());
module.exports = CreeperSerialiser;
