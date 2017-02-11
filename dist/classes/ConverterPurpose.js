"use strict";
var ConverterPurpose = (function () {
    function ConverterPurpose(value) {
        if (value === void 0) { value = null; }
        if (typeof value === "string") {
            if (value === null)
                value = "Default";
            switch (value) {
                case "Default":
                    this.value = 1;
                    break;
                case "SMS":
                    this.value = 2;
                    break;
                default:
                    throw new Error("ConverterPurpose constructor string did not match a known string");
            }
        }
        else {
            if (value === null)
                value = 1;
            this.value = value;
        }
    }
    ConverterPurpose.prototype.toString = function () {
        switch (this.value) {
            case 1:
                return "Default";
            case 2:
                return "SMS";
        }
        return "Unknown";
    };
    return ConverterPurpose;
}());
exports.__esModule = true;
exports["default"] = ConverterPurpose;
