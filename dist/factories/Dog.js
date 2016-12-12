"use strict";
var Dog_1 = require("../classes/Dog");
var DogFactory = (function () {
    function DogFactory() {
    }
    DogFactory.prototype.make = function () {
        var constructorArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constructorArguments[_i - 0] = arguments[_i];
        }
        var object = Object.create(Dog_1["default"].prototype);
        Dog_1["default"].apply(object, constructorArguments);
        return object;
    };
    return DogFactory;
}());
module.exports = DogFactory;
