"use strict";
var CreeperActionType = (function () {
    function CreeperActionType(value) {
        if (typeof value === "string") {
            switch (value) {
                case "All":
                    this.value = 1;
                    break;
                case "Reply":
                    this.value = 2;
                    break;
                default:
                    throw new Error("CreeperActionType constructor value did not match a known string");
            }
        }
        else {
            this.value = value;
        }
    }
    CreeperActionType.prototype.toString = function () {
        switch (this.value) {
            case 1:
                return "All";
            case 2:
                return "Reply";
        }
        return "Unknown";
    };
    return CreeperActionType;
}());
exports.__esModule = true;
exports["default"] = CreeperActionType;
