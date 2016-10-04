//
// SERIALISERS
//
import Serialiser = require("./serialisers/Serialiser");
import DogSerialiser = require("./serialisers/Dog");
import CreeperSerialiser = require("./serialisers/Creeper");
import CreeperTypeSerialiser = require("./serialisers/CreeperType");
import CreeperActionSerialiser = require("./serialisers/CreeperAction");
import CreeperActionTypeSerialiser = require("./serialisers/CreeperActionType");

//
// FACTORIES
//
import Factory = require("./factories/Factory");
import DogFactory = require("./factories/Dog");
import CreeperFactory = require("./factories/Creeper");
import CreeperTypeFactory = require("./factories/CreeperType");
import CreeperActionFactory = require("./factories/CreeperAction");
import CreeperActionTypeFactory = require("./factories/CreeperActionType");

module Objectify {

  const serialisers: Array<Serialiser> = [
    new DogSerialiser(),
    new CreeperSerialiser(),
    new CreeperTypeSerialiser(),
    new CreeperActionSerialiser(),
    new CreeperActionTypeSerialiser()
  ];

  const factories: Array<Factory> = [
    new DogFactory(),
    new CreeperFactory(),
    new CreeperTypeFactory(),
    new CreeperActionFactory(),
    new CreeperActionTypeFactory()
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