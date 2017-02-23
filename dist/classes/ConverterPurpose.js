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
    ConverterPurpose.prototype.getFields = function () {
        switch (this.value) {
            case 1:
                return [
                    {
                        "name": "name",
                        "text": "Name",
                        "type": "text",
                        "value": ""
                    },
                    // name of "email" makes this have id="email" so e-mails are suggested/autocompleted in the form
                    {
                        "name": "email",
                        "text": "E-mail",
                        "type": "email",
                        "value": ""
                    }
                ];
            case 2:
                return [
                    {
                        "name": "phone",
                        "text": "Phone Number",
                        "type": "phone",
                        "value": ""
                    }
                ];
            default:
                return [];
        }
    };
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
