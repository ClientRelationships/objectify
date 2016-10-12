import Serialiser = require("./Serialiser");
import Dog = require("../classes/Dog");

class DogSerialiser implements Serialiser {

  toRaw (dog: Dog): Object {
    return {
      "name": dog.name,
      "age": dog.age
    };
  }

  fromRaw (object): Dog {
    return new Dog(object.name, object.age);
  }

}

export = DogSerialiser;