import Serialiser = require("./serialisers/Serialiser");
import Factory = require("./factories/Factory");

//
// SERIALISERS
//
import DogSerialiser = require("./serialisers/Dog");
import CreeperSerialiser = require("./serialisers/Creeper");
import CreeperActionSerialiser = require("./serialisers/CreeperAction");
import ConverterSerialiser = require("./serialisers/Converter");
import DeepProfileSerialiser = require("./serialisers/DeepProfile");

//
// FACTORIES
//
import DogFactory = require("./factories/Dog");
import CreeperFactory = require("./factories/Creeper");
import CreeperActionFactory = require("./factories/CreeperAction");
import CreeperFrequenciesFactory = require("./factories/CreeperFrequencies");
import ConverterFactory = require("./factories/Converter");
import DeepProfileFactory = require("./factories/DeepProfile");

module Objectify {

  const serialisers: { [name: string]: Serialiser; } = {};
  serialisers["Dog"] = new DogSerialiser();
  serialisers["Creeper"] = new CreeperSerialiser();
  serialisers["CreeperAction"] = new CreeperActionSerialiser();
  serialisers["Converter"] = new ConverterSerialiser();
  serialisers["DeepProfile"] = new DeepProfileSerialiser();

  const factories: { [name: string]: Factory; } = {};
  factories["Dog"] = new DogFactory();
  factories["Creeper"] = new CreeperFactory();
  factories["CreeperAction"] = new CreeperActionFactory();
  factories["CreeperFrequencies"] = new CreeperFrequenciesFactory();
  factories["Converter"] = new ConverterFactory();
  factories["DeepProfile"] = new DeepProfileFactory();

  function getThingByName (object: Object, name: string): any {
    const thing = object[name] || null;
    if (thing === null) {
      throw new ReferenceError(`Nothing with name ${name}.`);
    }
    return thing;
  }

  export function toRaw (serialiserName: string, object: Object): Object {
    const serialiser = getThingByName(serialisers, serialiserName);
    return serialiser.toRaw(object);
  }

  export function fromRaw (serialiserName: string, object: Object): Object {
    const serialiser = getThingByName(serialisers, serialiserName);
    return serialiser.fromRaw(object);
  }

  export function factory (factoryName: string): Object {
    const factory = getThingByName(factories, factoryName);
    const make = function (...constructorArguments: Array<string>) {
      return factory.make.apply(factory, constructorArguments);
    };
    return {
      make
    };
  }

}

export = Objectify;