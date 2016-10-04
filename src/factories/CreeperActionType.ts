import Factory = require("./Factory");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionTypeFactory implements Factory {

  name = "CreeperActionType";

  make (...constructorArguments: Array<any>): CreeperActionType {
    let value: string = constructorArguments.shift();
    let convertedValue;
    switch (value) {
      case "All":
        convertedValue = 1;
        break;
      case "Reply":
        convertedValue = 2;
        break;
      default:
        throw new Error("CreeperActionType make value did not match a known value");
    }
    return new CreeperActionType(convertedValue);
  }

}

export = CreeperActionTypeFactory;