"use strict";

const objectify = require("../../dist");

let creeperActionType = objectify.factory("CreeperActionType").make("Reply");
console.log(creeperActionType);

let creeperActionTypeRaw = objectify.toRaw("CreeperActionType", creeperActionType);
console.log(creeperActionTypeRaw);