"use strict";

const objectify = require("../../dist");

let creeperType = objectify.factory("CreeperType").make("LeadGen");
console.log(creeperType);

let creeperTypeRaw = objectify.toRaw("CreeperType", creeperType);
console.log(creeperTypeRaw);