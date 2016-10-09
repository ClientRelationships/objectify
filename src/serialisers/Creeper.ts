import Serialiser = require("./Serialiser");

import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperSerialiser implements Serialiser {

  name = "Creeper";

  toRaw (creeper: Creeper): Object {
    let o: Object = {};
    if (creeper.name) o["name"] = creeper.name;
    o["type"] = creeper.type.value;
    o["keywords"] = creeper.keywords.toString();
    o["isEnabled"] = creeper.isEnabled;
    o["actionFrequency"] = creeper.frequency.value;
    o["delay"] = creeper.delay;
    return o;
  }

  fromRaw (object): Creeper {
    let type: CreeperType = new CreeperType(object.type);
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
    let frequency: CreeperFrequency = new CreeperFrequency(object.actionFrequency);
    let delay = object.delay;
    let creeper = new Creeper(
      object.creeperId,
      object.name,
      type,
      keywords,
      actions,
      object.isEnabled,
      frequency,
      delay
    );
    if (object.clientId) creeper.clientId = object.clientId;
    return creeper;
  }

}

export = CreeperSerialiser;