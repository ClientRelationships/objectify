"use strict";
var Converter_1 = require("../classes/Converter");
var ConverterSerialiser = (function () {
    function ConverterSerialiser() {
    }
    ConverterSerialiser.prototype.toRaw = function (converter) {
        return {
            "name": converter.name,
            "grabber": converter.grabber,
            "explainer": converter.explainer,
            "persuader": converter.persuader,
            "imageUrl": converter.imageUrl,
            "forwardUrl": converter.forwardUrl,
            "callToAction": converter.callToAction
        };
    };
    ConverterSerialiser.prototype.fromRaw = function (object) {
        var id = object.converterId;
        return new Converter_1["default"](id, object.name, object.grabber, object.explainer, object.persuader, object.imageUrl, object.forwardUrl, object.callToAction, object._links);
    };
    return ConverterSerialiser;
}());
module.exports = ConverterSerialiser;