import Serialiser = require("./serialisers/Serialiser");
import Factory = require("./factories/Factory");

//
// SERIALISERS
//
import DogSerialiser = require("./serialisers/Dog");
import CreeperSerialiser = require("./serialisers/Creeper");
import CreeperActionSerialiser = require("./serialisers/CreeperAction");

//
// FACTORIES
//
import DogFactory = require("./factories/Dog");
import CreeperFactory = require("./factories/Creeper");
import CreeperActionFactory = require("./factories/CreeperAction");
import CreeperFrequenciesFactory = require("./factories/CreeperFrequencies");

module Objectify {

  const serialisers: { [name: string]: Serialiser; } = {};
  serialisers["Dog"] = new DogSerialiser();
  serialisers["Creeper"] = new CreeperSerialiser();
  serialisers["CreeperAction"] = new CreeperActionSerialiser();

  const factories: { [name: string]: Factory; } = {};
  factories["Dog"] = new DogFactory();
  factories["Creeper"] = new CreeperFactory();
  factories["CreeperAction"] = new CreeperActionFactory();
  factories["CreeperFrequencies"] = new CreeperFrequenciesFactory();

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