"use strict";
var CreeperAction_1 = require("../classes/CreeperAction");
var CreeperActionType_1 = require("../classes/CreeperActionType");
var CreeperActionFactory = (function () {
    function CreeperActionFactory() {
    }
    CreeperActionFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        var type = new CreeperActionType_1["default"](constructorArguments.shift());
        var data = constructorArguments.shift();
        return new CreeperAction_1["default"](undefined, type, data);
    };
    return CreeperActionFactory;
}());
module.exports = CreeperActionFactory;
