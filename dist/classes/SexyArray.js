"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SexyArray = (function (_super) {
    __extends(SexyArray, _super);
    function SexyArray(itemPrepend) {
        _super.call(this);
        this.itemPrepend = itemPrepend || "item";
    }
    SexyArray.prototype.contains = function (element) {
        return (this.indexOf(element) !== -1);
    };
    SexyArray.prototype.add = function (element) {
        if (typeof element === "string") {
            this.push(element);
        }
        else {
            this.push(this.itemPrepend + " " + (this.length + 1));
        }
        return this;
    };
    SexyArray.prototype.updateByIndex = function (index, newKeyword) {
        if (index === -1)
            return this;
        this[index] = newKeyword;
        return this;
    };
    SexyArray.prototype.update = function (oldKeyword, newKeyword) {
        var index = this.indexOf(oldKeyword);
        return this.updateByIndex(index, newKeyword);
    };
    SexyArray.prototype.removeByIndex = function (index) {
        if (index === -1)
            return this;
        this.splice(index, 1);
        return this;
    };
    SexyArray.prototype.remove = function (element) {
        var index = this.indexOf(element);
        return this.removeByIndex(index);
    };
    SexyArray.prototype.toString = function () {
        return this.join(", ");
    };
    SexyArray.prototype.fromArray = function (array) {
        var _this = this;
        this.length = 0;
        array.forEach(function (element) {
            _this.push(element);
        });
        return this;
    };
    SexyArray.prototype.fromString = function (string) {
        if (string.length === 0)
            return this.fromArray([]);
        this.fromArray(string.split(", "));
        return this;
    };
    return SexyArray;
}(Array));
exports.__esModule = true;
exports["default"] = SexyArray;
