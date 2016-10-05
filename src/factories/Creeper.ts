import Factory = require("./Factory");
// CLASSES
import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperFrequency = require("../classes/CreeperFrequency");

// FACTORIES
import CreeperTypeFactory = require("./CreeperType");
import CreeperKeywordsFactory = require("./CreeperKeywords");
import CreeperFrequencyFactory = require("./CreeperFrequency");

class CreeperFactory implements Factory {

  name = "Creeper";
  creeperTypeFactory: CreeperTypeFactory = new CreeperTypeFactory();
  creeperKeywordsFactory: CreeperKeywordsFactory = new CreeperKeywordsFactory();
  creeperFrequencyFactory: CreeperFrequencyFactory = new CreeperFrequencyFactory();

  make (...constructorArguments: Array<any>): Creeper {
    let name: string = constructorArguments.shift();
    let type: CreeperType = this.creeperTypeFactory.make(constructorArguments.shift());
    let keywords: CreeperKeywords = this.creeperKeywordsFactory.make(constructorArguments.shift());
    let frequency: CreeperFrequency = this.creeperFrequencyFactory.make();
    return new Creeper(undefined, name, type, keywords, [], true, frequency);
  }

}

export = CreeperFactory;