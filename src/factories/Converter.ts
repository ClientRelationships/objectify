import Factory = require("./Factory");

import Converter from "../classes/Converter";

class ConverterFactory implements Factory {

  make (...constructorArguments: Array<any>): Converter {
    const object = Object.create(Converter.prototype);
    Converter.apply(object, constructorArguments);
    return object;
  }

}

export = ConverterFactory;