import Factory = require("./Factory");

import Converter from "../classes/Converter";

class ConverterFactory implements Factory {

  make (...constructorArguments: Array<any>): Converter {
    const name: string = constructorArguments.shift();
    return new Converter(undefined, name);
  }

}

export = ConverterFactory;