"use strict";

const Objectify = require("../../dist");

let creeperAction = Objectify.factory("CreeperAction").make("Reply");
console.log(creeperAction);

let creeperActionRaw = Objectify.toRaw("CreeperAction", creeperAction);
console.log(creeperActionRaw);