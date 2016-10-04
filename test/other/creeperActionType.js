"use strict";

const Objectify = require("../../dist");

let creeperActionType = Objectify.factory("CreeperActionType").make("Reply");
console.log(creeperActionType);

let creeperActionTypeRaw = Objectify.toRaw("CreeperActionType", creeperActionType);
console.log(creeperActionTypeRaw);