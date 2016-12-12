"use strict";
var Dog_1 = require("../classes/Dog");
var DogSerialiser = (function () {
    function DogSerialiser() {
    }
    DogSerialiser.prototype.toRaw = function (dog) {
        return {
            "name": dog.name,
            "age": dog.age
        };
    };
    DogSerialiser.prototype.fromRaw = function (object) {
        return new Dog_1["default"](object.name, object.age);
    };
    return DogSerialiser;
}());
module.exports = DogSerialiser;
