import Factory = require("./Factory");
import CreeperKeywords = require("../classes/CreeperKeywords");

class CreeperKeywordsFactory implements Factory {

  name = "CreeperKeywords";

  make (...constructorArguments: Array<any>): CreeperKeywords {
    let keywords: Array<string> = constructorArguments.shift();
    let convertedKeywords = new CreeperKeywords();
    convertedKeywords.fromArray(keywords);
    return convertedKeywords;
  }

}

export = CreeperKeywordsFactory;