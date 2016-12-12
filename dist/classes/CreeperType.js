"use strict";
var CreeperType = (function () {
    function CreeperType(value) {
        if (typeof value === "string") {
            switch (value) {
                case "All":
                    this.value = 1;
                    break;
                case "Autochirp":
                    this.value = 2;
                    break;
                case "LeadGen":
                    this.value = 3;
                    break;
                default:
                    throw new Error("CreeperType constructor string did not match a known string");
            }
        }
        else {
            this.value = value;
        }
    }
    CreeperType.prototype.toString = function () {
        switch (this.value) {
            case 1:
                return "All";
            case 2:
                return "Autochirp";
            case 3:
                return "LeadGen";
        }
        return "Unknown";
    };
    return CreeperType;
}());
exports.__esModule = true;
exports["default"] = CreeperType;
