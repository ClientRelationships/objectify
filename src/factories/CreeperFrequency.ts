import Factory = require("./Factory");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperFrequencyFactory implements Factory {

  name = "CreeperFrequency";

  make (...constructorArguments: Array<any>): CreeperFrequency {
    return new CreeperFrequency(30);
  }

}

export = CreeperFrequencyFactory;