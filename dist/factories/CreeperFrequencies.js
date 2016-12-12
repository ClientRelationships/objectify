"use strict";
var CreeperFrequency_1 = require("../classes/CreeperFrequency");
var CreeperFrequenciesFactory = (function () {
    function CreeperFrequenciesFactory() {
    }
    CreeperFrequenciesFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        return [
            new CreeperFrequency_1["default"](1),
            new CreeperFrequency_1["default"](30),
            new CreeperFrequency_1["default"](59)
        ];
    };
    return CreeperFrequenciesFactory;
}());
module.exports = CreeperFrequenciesFactory;
