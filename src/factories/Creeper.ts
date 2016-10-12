import Factory = require("./Factory");

import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperFactory implements Factory {

  make (...constructorArguments: Array<any>): Creeper {
    const name: string = constructorArguments.shift();
    const type: CreeperType = new CreeperType(constructorArguments.shift());
    const keywords: CreeperKeywords = new CreeperKeywords();
    keywords.fromArray(constructorArguments.shift());
    const frequency: CreeperFrequency = new CreeperFrequency(30);
    const delay = 5 * 60;
    return new Creeper(undefined, name, type, keywords, [], true, frequency, delay);
  }

}

export = CreeperFactory;