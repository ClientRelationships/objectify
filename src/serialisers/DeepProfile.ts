import Serialiser = require("./Serialiser");

import DeepProfile from "../classes/DeepProfile";

class DeepProfileSerialiser implements Serialiser {

  toRaw (deepProfile: DeepProfile): Object {
    return JSON.parse(JSON.stringify(deepProfile));
  }

  fromRaw (object): DeepProfile {
    let deepProfile = new DeepProfile(
      object.deepProfileId,
      object.status,
      object.statisticId,
      object.whenUnprocessed,
      object.whenProcessed,
      object.source,
      object.converterId,
      object.creeperId,
      object.creeperActionId,
      object.creeperQuality,
      object.feedbackHash,
      object.feedbackIsAnonymous,
      object.feedbackIsSubscribed
    );
    let fieldKeys = Object.keys(object).filter(
      key => key.indexOf("_") !== -1
    );
    fieldKeys.forEach(key => {
      deepProfile.setField(key.substring(0, key.indexOf("_")), key.substring(key.indexOf("_") + 1), object[key]);
    });
    return deepProfile;
  }

}

export = DeepProfileSerialiser;