"use strict";

const objectify = require("../../dist");

console.log("Object:");
let creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"]);
console.log(creeper);

console.log("Object Property:");
console.log(creeper.frequency.toString());

console.log("Raw:");
let creeperRaw = objectify.toRaw("Creeper", creeper);
console.log(creeperRaw);