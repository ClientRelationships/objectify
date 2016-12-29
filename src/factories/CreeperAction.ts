import Factory = require("./Factory");

import CreeperAction from "../classes/CreeperAction";
import CreeperActionType from "../classes/CreeperActionType";

class CreeperActionFactory implements Factory {

  make (...constructorArguments: Array<any>): CreeperAction {
    const type: CreeperActionType = new CreeperActionType(constructorArguments.shift());
    const data: string = constructorArguments.shift();
    return new CreeperAction(undefined, type, data);
  }

}

export = CreeperActionFactory;