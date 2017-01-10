"use strict";
//
// SERIALISERS
//
var DogSerialiser = require("./serialisers/Dog");
var CreeperSerialiser = require("./serialisers/Creeper");
var CreeperActionSerialiser = require("./serialisers/CreeperAction");
var ConverterSerialiser = require("./serialisers/Converter");
var DeepProfileSerialiser = require("./serialisers/DeepProfile");
//
// FACTORIES
//
var DogFactory = require("./factories/Dog");
var CreeperFactory = require("./factories/Creeper");
var CreeperActionFactory = require("./factories/CreeperAction");
var CreeperFrequenciesFactory = require("./factories/CreeperFrequencies");
var ConverterFactory = require("./factories/Converter");
var DeepProfileFactory = require("./factories/DeepProfile");
var Objectify;
(function (Objectify) {
    var serialisers = {};
    serialisers["Dog"] = new DogSerialiser();
    serialisers["Creeper"] = new CreeperSerialiser();
    serialisers["CreeperAction"] = new CreeperActionSerialiser();
    serialisers["Converter"] = new ConverterSerialiser();
    serialisers["DeepProfile"] = new DeepProfileSerialiser();
    var factories = {};
    factories["Dog"] = new DogFactory();
    factories["Creeper"] = new CreeperFactory();
    factories["CreeperAction"] = new CreeperActionFactory();
    factories["CreeperFrequencies"] = new CreeperFrequenciesFactory();
    factories["Converter"] = new ConverterFactory();
    factories["DeepProfile"] = new DeepProfileFactory();
    function getThingByName(object, name) {
        var thing = object[name] || null;
        if (thing === null) {
            throw new ReferenceError("Nothing with name " + name + ".");
        }
        return thing;
    }
    function toRaw(serialiserName, object) {
        var serialiser = getThingByName(serialisers, serialiserName);
        return serialiser.toRaw(object);
    }
    Objectify.toRaw = toRaw;
    function fromRaw(serialiserName, object) {
        var serialiser = getThingByName(serialisers, serialiserName);
        return serialiser.fromRaw(object);
    }
    Objectify.fromRaw = fromRaw;
    function factory(factoryName) {
        var factory = getThingByName(factories, factoryName);
        var make = function () {
            var constructorArguments = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                constructorArguments[_i - 0] = arguments[_i];
            }
            return factory.make.apply(factory, constructorArguments);
        };
        return {
            make: make
        };
    }
    Objectify.factory = factory;
})(Objectify || (Objectify = {}));
module.exports = Objectify;
