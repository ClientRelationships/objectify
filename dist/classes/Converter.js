"use strict";
var Converter = (function () {
    function Converter(converterId, name, grabber, explainer, persuader, imageUrl, forwardUrl, callToAction, deepProfileOnSubmit, _links) {
        if (grabber === void 0) { grabber = "?"; }
        if (explainer === void 0) { explainer = "?"; }
        if (persuader === void 0) { persuader = "?"; }
        if (imageUrl === void 0) { imageUrl = "?"; }
        if (forwardUrl === void 0) { forwardUrl = "?"; }
        if (callToAction === void 0) { callToAction = "?"; }
        if (deepProfileOnSubmit === void 0) { deepProfileOnSubmit = false; }
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
        this._links = _links;
    }
    Converter.prototype.toString = function () {
        return this.name + " (ID " + this.converterId + ")";
    };
    return Converter;
}());
exports.__esModule = true;
exports["default"] = Converter;
