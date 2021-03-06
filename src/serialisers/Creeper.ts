import Serialiser = require("./Serialiser");

import Creeper from "../classes/Creeper";
import CreeperType from "../classes/CreeperType";
import CreeperAction from "../classes/CreeperAction";
import CreeperActionType from "../classes/CreeperActionType";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperLocation from "../classes/CreeperLocation";
import CreeperFrequency from "../classes/CreeperFrequency";
import CreeperHandlesTweetedAt from "../classes/CreeperHandlesTweetedAt";

class CreeperSerialiser implements Serialiser {

  toRaw (creeper: Creeper): Object {
    const object: Object = {};
    if (creeper.name) object["name"] = creeper.name;
    object["type"] = creeper.type.value;
    object["keywords"] = creeper.keywords.toString();
    object["state"] = creeper.state;
    object["isEnabledByUs"] = (creeper.isEnabledByUs === true ? 1 : 0);
    object["actionFrequency"] = creeper.frequency.value;
    object["delay"] = creeper.delay;
    object["handlesTweetedAt"] = creeper.handlesTweetedAt.toString();
    object["converterId"] = creeper.converterId;
    object["deepProfileOnFind"] = (creeper.deepProfileOnFind === true ? 1 : 0);
    object["deepProfileOnAction"] = (creeper.deepProfileOnAction === true ? 1 : 0);
    object["geo"] = creeper.geofilter.toString();
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
    const isEnabledByUs: boolean = (object.isEnabledByUs === 1 ? true : false);
    const frequency: CreeperFrequency = new CreeperFrequency(object.actionFrequency);
    const handlesTweetedAt = new CreeperHandlesTweetedAt();
    handlesTweetedAt.fromString(object.handlesTweetedAt);
    const deepProfileOnFind = (object.deepProfileOnFind === 1 ? true : false);
    const deepProfileOnAction = (object.deepProfileOnAction === 1 ? true : false);
    const geofilter: CreeperLocation = new CreeperLocation();
    geofilter.fromString(object.geo);
    const creeper = new Creeper(
      object.creeperId,
      object.name,
      type,
      keywords,
      actions,
      object.state,
      isEnabledByUs,
      frequency,
      object.delay,
      handlesTweetedAt,
      object.converterId,
      deepProfileOnFind,
      deepProfileOnAction,
      geofilter
    );
    if (object.clientId) creeper.setClient({
      "clientId": object.clientId
    });
    return creeper;
  }

}

export = CreeperSerialiser;
