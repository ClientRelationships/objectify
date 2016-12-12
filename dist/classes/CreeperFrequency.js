"use strict";
var CreeperFrequency = (function () {
    function CreeperFrequency(value) {
        this.value = value;
    }
    CreeperFrequency.prototype.toString = function () {
        switch (this.value) {
            case 1:
                return "Low (1/60)";
            case 30:
                return "Normal (30/60)";
            case 59:
                return "High (59/60)";
        }
        return "Unknown";
    };
    return CreeperFrequency;
}());
exports.__esModule = true;
exports["default"] = CreeperFrequency;
