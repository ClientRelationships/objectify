"use strict";

const Objectify = require("../../dist");

let creeperType = Objectify.factory("CreeperType").make("LeadGen");
console.log(creeperType);

let creeperTypeRaw = Objectify.toRaw("CreeperType", creeperType);
console.log(creeperTypeRaw);