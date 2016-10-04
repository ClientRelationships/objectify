import Serialiser = require("./Serialiser");
import CreeperActionType = require("../classes/CreeperActionType");

class CreeperActionTypeSerialiser implements Serialiser {

  name = "CreeperActionType";

  toRaw (creeperActionType: CreeperActionType): number {
    return creeperActionType.value;
  }

  fromRaw (value): CreeperActionType {
    return new CreeperActionType(value);
  }

}

export = CreeperActionTypeSerialiser;