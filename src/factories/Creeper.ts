import Factory = require("./Factory");

import Creeper from "../classes/Creeper";
import CreeperType from "../classes/CreeperType";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperFrequency from "../classes/CreeperFrequency";

class CreeperFactory implements Factory {

  make (...constructorArguments: Array<any>): Creeper {
    const name: string = constructorArguments.shift();
    const type: CreeperType = new CreeperType(constructorArguments.shift());
    const keywords: CreeperKeywords = new CreeperKeywords();
    keywords.fromArray(constructorArguments.shift());
    if (constructorArguments.length > 0) {
      const actions: Array<any> = constructorArguments.shift();
      const isEnabled: boolean = constructorArguments.shift();
      const isEnabledByUs: boolean = constructorArguments.shift();
      const geo: string = constructorArguments.shift();
      return new Creeper(
        undefined,
        name,
        type,
        keywords,
        undefined,
        isEnabled,
        isEnabledByUs,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        geo
       );
    } else {
      return new Creeper(undefined, name, type, keywords);
    }
  }

}

export = CreeperFactory;