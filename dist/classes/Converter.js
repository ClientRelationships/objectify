"use strict";
var ConverterPurpose_1 = require("../classes/ConverterPurpose");
var Converter = (function () {
    function Converter(converterId, name, grabber, explainer, persuader, imageUrl, forwardUrl, callToAction, deepProfileOnSubmit, purpose, _links) {
        if (grabber === void 0) { grabber = "<Attention Grabbing Headline>"; }
        if (explainer === void 0) { explainer = "<Justify Information Retrieval>"; }
        if (persuader === void 0) { persuader = "<Persuade and Convince>"; }
        if (imageUrl === void 0) { imageUrl = "?"; }
        if (forwardUrl === void 0) { forwardUrl = "?"; }
        if (callToAction === void 0) { callToAction = "Continue"; }
        if (deepProfileOnSubmit === void 0) { deepProfileOnSubmit = false; }
        if (purpose === void 0) { purpose = new ConverterPurpose_1["default"](); }
        if (_links === void 0) { _links = {}; }
        this.converterId = converterId;
        this.name = name;
        this.grabber = grabber;
        this.explainer = explainer;
        this.persuader = persuader;
        this.imageUrl = imageUrl;
        this.forwardUrl = forwardUrl;
        this.callToAction = callToAction;
        this.deepProfileOnSubmit = deepProfileOnSubmit;
        this.purpose = purpose;
        this._links = _links;
    }
    Converter.prototype.toString = function () {
        return this.name + " (ID " + this.converterId + ")";
    };
    return Converter;
}());
exports.__esModule = true;
exports["default"] = Converter;
