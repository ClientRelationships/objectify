import Factory = require("./Factory");

import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperFactory implements Factory {

  name = "Creeper";

  make (...constructorArguments: Array<any>): Creeper {
    let name: string = constructorArguments.shift();
    let type: CreeperType = new CreeperType(constructorArguments.shift());
    let keywords: CreeperKeywords = new CreeperKeywords();
    keywords.fromArray(constructorArguments.shift());
    let frequency: CreeperFrequency = new CreeperFrequency(30);
    return new Creeper(undefined, name, type, keywords, [], true, frequency);
  }

}

export = CreeperFactory;