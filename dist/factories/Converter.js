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
        var object = Object.create(Converter_1["default"].prototype);
        Converter_1["default"].apply(object, constructorArguments);
        return object;
    };
    return ConverterFactory;
}());
module.exports = ConverterFactory;
