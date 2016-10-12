import Factory = require("./Factory");
import Dog = require("../classes/Dog");

class DogFactory implements Factory {

  make (...constructorArguments: Array<string>): Dog {
    const object = Object.create(Dog.prototype);
    Dog.apply(object, constructorArguments);
    return object;
  }

}

export = DogFactory;