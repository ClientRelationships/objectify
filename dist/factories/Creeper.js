"use strict";
var Creeper_1 = require("../classes/Creeper");
var CreeperType_1 = require("../classes/CreeperType");
var CreeperKeywords_1 = require("../classes/CreeperKeywords");
var CreeperLocation_1 = require("../classes/CreeperLocation");
var CreeperFactory = (function () {
    function CreeperFactory() {
    }
    CreeperFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        var name = constructorArguments.shift();
        var type = new CreeperType_1["default"](constructorArguments.shift());
        var keywords = new CreeperKeywords_1["default"]();
        keywords.fromArray(constructorArguments.shift());
        if (constructorArguments.length > 0) {
            var actions = constructorArguments.shift();
            var state = constructorArguments.shift();
            var geofilter = new CreeperLocation_1["default"]();
            geofilter.fromArray(constructorArguments.shift());
            return new Creeper_1["default"](undefined, name, type, keywords, undefined, state, undefined, undefined, undefined, undefined, undefined, undefined, undefined, geofilter);
        }
        else {
            return new Creeper_1["default"](undefined, name, type, keywords);
        }
    };
    return CreeperFactory;
}());
module.exports = CreeperFactory;
