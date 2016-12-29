"use strict";
var CreeperAction = (function () {
    function CreeperAction(creeperActionId, type, data) {
        if (data === void 0) { data = "Hello, World."; }
        this.creeperActionId = creeperActionId;
        this.type = type;
        this.data = data;
    }
    return CreeperAction;
}());
exports.__esModule = true;
exports["default"] = CreeperAction;
