import Factory = require("./Factory");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionFactory implements Factory {

  name = "CreeperAction";

  make (...constructorArguments: Array<any>): CreeperAction {
    let type: CreeperActionType = new CreeperActionType(constructorArguments.shift());
    let data = "Hello, World.";
    return new CreeperAction(undefined, type, data);
  }

}

export = CreeperActionFactory;