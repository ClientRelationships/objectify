"use strict";

const Objectify = require("../../dist");

let creeper = Objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"]);
console.log(creeper);

let creeperRaw = Objectify.toRaw("Creeper", creeper);
console.log(creeperRaw);