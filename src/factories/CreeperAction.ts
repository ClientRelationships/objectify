import Factory = require("./Factory");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");
import CreeperActionTypeFactory = require("./CreeperActionType");

class CreeperActionFactory implements Factory {

  name = "CreeperAction";
  creeperActionTypeFactory: CreeperActionTypeFactory = new CreeperActionTypeFactory();

  make (...constructorArguments: Array<any>): CreeperAction {
    let type: CreeperActionType = this.creeperActionTypeFactory.make(constructorArguments.shift());
    let data = "Hello, World.";
    return new CreeperAction(undefined, type, data);
  }

}

export = CreeperActionFactory;