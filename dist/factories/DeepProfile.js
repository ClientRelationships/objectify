"use strict";
var DeepProfile_1 = require("../classes/DeepProfile");
var DeepProfileFactory = (function () {
    function DeepProfileFactory() {
    }
    DeepProfileFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        var object = Object.create(DeepProfile_1["default"].prototype);
        DeepProfile_1["default"].apply(object, constructorArguments);
        return object;
    };
    return DeepProfileFactory;
}());
module.exports = DeepProfileFactory;
