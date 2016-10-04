import Factory = require("./Factory");
import CreeperType = require("../classes/CreeperType");

class CreeperTypeFactory implements Factory {

  name = "CreeperType";

  make (...constructorArguments: Array<any>): CreeperType {
    let value: string = constructorArguments.shift();
    let convertedValue;
    switch (value) {
      case "All":
        convertedValue = 1;
        break;
      case "Autochirp":
        convertedValue = 2;
        break;
      case "LeadGen":
        convertedValue = 3;
        break;
      default:
        throw new Error("CreeperTypeFactory make value did not match a known value");
    }
    return new CreeperType(convertedValue);
  }

}

export = CreeperTypeFactory;