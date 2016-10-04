import Serialiser = require("./Serialiser");
import CreeperActionTypeSerialiser = require("./CreeperActionType");

import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionSerialiser implements Serialiser {

  name = "CreeperAction";
  creeperActionTypeSerialiser: CreeperActionTypeSerialiser = new CreeperActionTypeSerialiser();

  toRaw (creeperAction: CreeperAction): Object {
    return {
      "type": this.creeperActionTypeSerialiser.toRaw(creeperAction.type),
      "data": creeperAction.data
    };
  }

  fromRaw (object): CreeperAction {
    let id = object.creeperActionId;
    let type: CreeperActionType = this.creeperActionTypeSerialiser.fromRaw(object.value);
    let data: string = object.data;
    return new CreeperAction(
      id,
      type,
      data
    );
  }

}

export = CreeperActionSerialiser;