import Serialiser = require("./Serialiser");

class Dog {

  name: string;
  age: number;

  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  describe (): string {
    return `Woof! I am ${this.age} years old`;
  }

}

class DogSerialiser implements Serialiser {

  name = "Dog";

  toRaw (dog): Object {
    return {
      "name": dog.name,
      "age": dog.age
    };
  }

  fromRaw (object): Object {
    return new Dog(object.name, object.age);
  }

}

export = DogSerialiser;