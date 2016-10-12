import Serialiser = require("./Serialiser");

import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionSerialiser implements Serialiser {

  toRaw (creeperAction: CreeperAction): Object {
    return {
      "type": creeperAction.type.value,
      "data": creeperAction.data
    };
  }

  fromRaw (object): CreeperAction {
    const id = object.creeperActionId;
    const type: CreeperActionType = new CreeperActionType(object.value);
    const data: string = object.data;
    return new CreeperAction(
      id,
      type,
      data
    );
  }

}

export = CreeperActionSerialiser;