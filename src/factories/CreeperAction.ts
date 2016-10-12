import Factory = require("./Factory");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionFactory implements Factory {

  make (...constructorArguments: Array<any>): CreeperAction {
    const type: CreeperActionType = new CreeperActionType(constructorArguments.shift());
    const data = "Hello, World.";
    return new CreeperAction(undefined, type, data);
  }

}

export = CreeperActionFactory;