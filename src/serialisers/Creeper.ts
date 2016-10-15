import Serialiser = require("./Serialiser");

import Creeper from "../classes/Creeper";
import CreeperType from "../classes/CreeperType";
import CreeperAction from "../classes/CreeperAction";
import CreeperActionType from "../classes/CreeperActionType";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperFrequency from "../classes/CreeperFrequency";

class CreeperSerialiser implements Serialiser {

  toRaw (creeper: Creeper): Object {
    const object: Object = {};
    if (creeper.name) object["name"] = creeper.name;
    object["type"] = creeper.type.value;
    object["keywords"] = creeper.keywords.toString();
    object["isEnabled"] = (creeper.isEnabled === true ? 1 : 0);
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
    const isEnabled: boolean = (object.isEnabled === 1 ? true : false);
    const frequency: CreeperFrequency = new CreeperFrequency(object.actionFrequency);
    const delay = object.delay;
    const creeper = new Creeper(
      object.creeperId,
      object.name,
      type,
      keywords,
      actions,
      isEnabled,
      frequency,
      delay
    );
    if (object.clientId) creeper.setClientId(object.clientId);
    return creeper;
  }

}

export = CreeperSerialiser;