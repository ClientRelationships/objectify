import Serialiser = require("./Serialiser");

import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionSerialiser implements Serialiser {

  name = "CreeperAction";

  toRaw (creeperAction: CreeperAction): Object {
    return {
      "type": creeperAction.type.value,
      "data": creeperAction.data
    };
  }

  fromRaw (object): CreeperAction {
    let id = object.creeperActionId;
    let type: CreeperActionType = new CreeperActionType(object.value);
    let data: string = object.data;
    return new CreeperAction(
      id,
      type,
      data
    );
  }

}

export = CreeperActionSerialiser;