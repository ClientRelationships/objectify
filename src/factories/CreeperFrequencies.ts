import Factory = require("./Factory");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperFrequenciesFactory implements Factory {

  name = "CreeperFrequencies";

  make (...constructorArguments: Array<any>): Array<CreeperFrequency> {
    return [
      new CreeperFrequency(1),
      new CreeperFrequency(30),
      new CreeperFrequency(59)
    ];
  }

}

export = CreeperFrequenciesFactory;