"use strict";
var Creeper_1 = require("../classes/Creeper");
var CreeperType_1 = require("../classes/CreeperType");
var CreeperAction_1 = require("../classes/CreeperAction");
var CreeperActionType_1 = require("../classes/CreeperActionType");
var CreeperKeywords_1 = require("../classes/CreeperKeywords");
var CreeperLocation_1 = require("../classes/CreeperLocation");
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
        object["state"] = creeper.state;
        object["isEnabledByUs"] = (creeper.isEnabledByUs === true ? 1 : 0);
        object["actionFrequency"] = creeper.frequency.value;
        object["delay"] = creeper.delay;
        object["handlesTweetedAt"] = creeper.handlesTweetedAt.toString();
        object["converterId"] = creeper.converterId;
        object["deepProfileOnFind"] = (creeper.deepProfileOnFind === true ? 1 : 0);
        object["deepProfileOnAction"] = (creeper.deepProfileOnAction === true ? 1 : 0);
        object["geo"] = creeper.geofilter.toString();
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
        var isEnabledByUs = (object.isEnabledByUs === 1 ? true : false);
        var frequency = new CreeperFrequency_1["default"](object.actionFrequency);
        var handlesTweetedAt = new CreeperHandlesTweetedAt_1["default"]();
        handlesTweetedAt.fromString(object.handlesTweetedAt);
        var deepProfileOnFind = (object.deepProfileOnFind === 1 ? true : false);
        var deepProfileOnAction = (object.deepProfileOnAction === 1 ? true : false);
        var geofilter = new CreeperLocation_1["default"]();
        geofilter.fromString(object.geo);
        var creeper = new Creeper_1["default"](object.creeperId, object.name, type, keywords, actions, object.state, isEnabledByUs, frequency, object.delay, handlesTweetedAt, object.converterId, deepProfileOnFind, deepProfileOnAction, geofilter);
        if (object.clientId)
            creeper.setClient({
                "clientId": object.clientId
            });
        return creeper;
    };
    return CreeperSerialiser;
}());
module.exports = CreeperSerialiser;
