import Factory = require("./Factory");
import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperTypeFactory = require("./CreeperType");
import CreeperKeywordsFactory = require("./CreeperKeywords");

class CreeperFactory implements Factory {

  name = "Creeper";
  creeperTypeFactory: CreeperTypeFactory = new CreeperTypeFactory();
  creeperKeywordsFactory: CreeperKeywordsFactory = new CreeperKeywordsFactory();

  toRaw (creeper): Object {
    console.log(this);
    return {};
  }

  make (...constructorArguments: Array<any>): Creeper {
    let name: string = constructorArguments.shift();
    let type: CreeperType = this.creeperTypeFactory.make(constructorArguments.shift());
    let keywords: CreeperKeywords = this.creeperKeywordsFactory.make(constructorArguments.shift());
    // creeperId: number, name: string, type: CreeperType, keywords: CreeperKeywords, actions: Array<CreeperAction>, isEnabled: boolean
    return new Creeper(undefined, name, type, keywords, [], true);
  }

}

export = CreeperFactory;