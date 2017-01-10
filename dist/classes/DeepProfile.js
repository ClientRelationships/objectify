// ES6 Map support
// bodged from https://www.reddit.com/r/typescript/comments/39taz3/map_class_in_typescript/cs69xpj/
/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />
"use strict";
var DeepProfile = (function () {
    function DeepProfile(deepProfileId, status, whenUnprocessed, whenProcessed, source, converterId, creeperId, creeperActionId, fields) {
        if (status === void 0) { status = null; }
        if (whenUnprocessed === void 0) { whenUnprocessed = ""; }
        if (whenProcessed === void 0) { whenProcessed = ""; }
        if (source === void 0) { source = null; }
        if (converterId === void 0) { converterId = null; }
        if (creeperId === void 0) { creeperId = null; }
        if (creeperActionId === void 0) { creeperActionId = null; }
        if (fields === void 0) { fields = new Map(); }
        this.deepProfileId = deepProfileId;
        this.status = status;
        this.whenUnprocessed = whenUnprocessed;
        this.whenProcessed = whenProcessed;
        this.source = source;
        this.converterId = converterId;
        this.creeperId = creeperId;
        this.creeperActionId = creeperActionId;
        this.fields = fields;
    }
    DeepProfile.prototype.setField = function (key, value) {
        this.fields.set(key, value);
    };
    DeepProfile.prototype.getField = function (key) {
        return this.fields.get(key);
    };
    DeepProfile.prototype.toString = function () {
        return this.source + " (ID " + this.deepProfileId + ")";
    };
    return DeepProfile;
}());
exports.__esModule = true;
exports["default"] = DeepProfile;
