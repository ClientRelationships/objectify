"use strict";
var Converter_1 = require("../classes/Converter");
var ConverterFactory = (function () {
    function ConverterFactory() {
    }
    ConverterFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        var name = constructorArguments.shift();
        return new Converter_1["default"](undefined, name);
    };
    return ConverterFactory;
}());
module.exports = ConverterFactory;
