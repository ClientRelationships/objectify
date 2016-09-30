import Serialiser = require("./serialisers/Serialiser");
import DogSerialiser = require("./serialisers/DogSerialiser");

module Objectify {

  const serialisers: Array<Serialiser> = [
    new DogSerialiser()
  ];

  function getSerialiserByName (serialiserName: string) {
    let matchingSerialisers = serialisers.filter(
      serialiser => (serialiserName === serialiser.name)
    );
    if (matchingSerialisers.length === 0) {
      throw new ReferenceError(`No serialiser with name ${serialiserName}.`);
    }
    return matchingSerialisers[0];
  }

  export function toRaw (serialiserName: string, object: Object) {
    let serialiser = getSerialiserByName(serialiserName);
    return serialiser.toRaw(object);
  }

  export function fromRaw (serialiserName: string, object: Object) {
    let serialiser = getSerialiserByName(serialiserName);
    return serialiser.fromRaw(object);
  }

}

export = Objectify;