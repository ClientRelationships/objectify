import Serialiser = require("./Serialiser");
import CreeperTypeSerialiser = require("./CreeperType");

import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");
import CreeperKeywords = require("../classes/CreeperKeywords");

class CreeperSerialiser implements Serialiser {

  name = "Creeper";
  creeperTypeSerialiser: CreeperTypeSerialiser = new CreeperTypeSerialiser();

  toRaw (creeper: Creeper): Object {
    let o: Object = {};
    if (creeper.name) o["name"] = creeper.name;
    o["type"] = this.creeperTypeSerialiser.toRaw(creeper.type);
    o["keywords"] = creeper.keywords.join(", ");
    o["isEnabled"] = creeper.isEnabled;
    return o;
  }

  fromRaw (object): Creeper {
    let type: CreeperType = this.creeperTypeSerialiser.fromRaw(object.type);
    let actions: Array<CreeperAction> = [];
    if (object.actions) {
      actions = object.actions.map((action) => {
        return new CreeperAction(
          action.creeperActionId,
          new CreeperActionType(action.type),
          action.data
        );
      });
    }
    let keywords: CreeperKeywords = new CreeperKeywords();
    keywords.fromString(object.keywords);
    return new Creeper(
      object.creeperId,
      object.name,
      type,
      keywords,
      actions,
      object.isEnabled
    );
  }

}

export = CreeperSerialiser;