"use strict";

const objectify = require("../../dist");

let creeperAction = objectify.factory("CreeperAction").make("Reply");
console.log(creeperAction);

let creeperActionRaw = objectify.toRaw("CreeperAction", creeperAction);
console.log(creeperActionRaw);