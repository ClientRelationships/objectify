import Serialiser = require("./Serialiser");

import Creeper = require("../classes/Creeper");
import CreeperType = require("../classes/CreeperType");
import CreeperAction = require("../classes/CreeperAction");
import CreeperActionType = require("../classes/CreeperActionType");
import CreeperKeywords = require("../classes/CreeperKeywords");
import CreeperFrequency = require("../classes/CreeperFrequency");

class CreeperSerialiser implements Serialiser {

  toRaw (creeper: Creeper): Object {
    const object: Object = {};
    if (creeper.name) object["name"] = creeper.name;
    object["type"] = creeper.type.value;
    object["keywords"] = creeper.keywords.toString();
    object["isEnabled"] = creeper.isEnabled;
    object["actionFrequency"] = creeper.frequency.value;
    object["delay"] = creeper.delay;
    return object;
  }

  fromRaw (object): Creeper {
    const type: CreeperType = new CreeperType(object.type);
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
    const keywords: CreeperKeywords = new CreeperKeywords();
    keywords.fromString(object.keywords);
    const frequency: CreeperFrequency = new CreeperFrequency(object.actionFrequency);
    const delay = object.delay;
    const creeper = new Creeper(
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