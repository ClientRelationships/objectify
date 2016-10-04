import Factory = require("./Factory");
import Dog = require("../classes/Dog");

class DogFactory implements Factory {

  name = "Dog";

  make (...constructorArguments: Array<string>): Dog {
    let object = Object.create(Dog.prototype);
    Dog.apply(object, constructorArguments);
    return object;
  }

}

export = DogFactory;