"use strict";
var CreeperAction = (function () {
    function CreeperAction(creeperActionId, type, data) {
        this.creeperActionId = creeperActionId;
        this.type = type;
        if (data) {
            this.data = data;
        }
    }
    return CreeperAction;
}());
exports.__esModule = true;
exports["default"] = CreeperAction;
