"use strict";
var Dog = (function () {
    function Dog(name, age) {
        this.name = name;
        this.age = age;
    }
    Dog.prototype.toString = function () {
        return "Woof! I am " + this.age + " years old";
    };
    return Dog;
}());
exports.__esModule = true;
exports["default"] = Dog;
