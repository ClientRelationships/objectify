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

  const serialisers: Array<Serialiser> = [
    new DogSerialiser(),
    new CreeperSerialiser(),
    new CreeperActionSerialiser()
  ];

  const factories: Array<Factory> = [
    new DogFactory(),
    new CreeperFactory(),
    new CreeperActionFactory(),
    new CreeperFrequenciesFactory()
  ];

  function getThingByName (array: Array<any>, name: string): any {
    let matchingThings = array.filter(
      arrayElement => (name === arrayElement.name)
    );
    if (matchingThings.length === 0) {
      throw new ReferenceError(`Nothing with name ${name}.`);
    }
    return matchingThings[0];
  }

  export function toRaw (serialiserName: string, object: Object): Object {
    let serialiser = getThingByName(serialisers, serialiserName);
    return serialiser.toRaw(object);
  }

  export function fromRaw (serialiserName: string, object: Object): Object {
    let serialiser = getThingByName(serialisers, serialiserName);
    return serialiser.fromRaw(object);
  }

  export function factory (factoryName: string): Object {
    let factory = getThingByName(factories, factoryName);
    let make = function (...constructorArguments: Array<string>) {
      return factory.make.apply(factory, constructorArguments);
    };
    return {
      make
    };
  }

}

export = Objectify;