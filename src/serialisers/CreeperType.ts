import Serialiser = require("./Serialiser");
import CreeperType = require("../classes/CreeperType");

class CreeperTypeSerialiser implements Serialiser {

  name = "CreeperType";

  toRaw (creeperType: CreeperType): number {
    return creeperType.value;
  }

  fromRaw (value): CreeperType {
    return new CreeperType(value);
  }

}

export = CreeperTypeSerialiser;