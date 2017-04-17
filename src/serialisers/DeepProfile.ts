import Serialiser = require("./Serialiser");

import DeepProfile from "../classes/DeepProfile";

class DeepProfileSerialiser implements Serialiser {

  toRaw (deepProfile: DeepProfile): Object {
    let raw = JSON.parse(JSON.stringify(deepProfile));
    const creeperKeywords = deepProfile.getField("creeper", "keywords");
    if (creeperKeywords) {
      raw.creeper_keywords = creeperKeywords.toString();
    }
    return raw;
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
    fieldKeys.forEach(fieldKey => {
      const region: string = fieldKey.substring(0, fieldKey.indexOf("_"));
      const key: string = fieldKey.substring(fieldKey.indexOf("_") + 1);
      let value: any = object[fieldKey];
      if (region === "creeper" && key === "keywords") {
        value = value.toString().split(", ");
      }
      deepProfile.setField(region, key, value);
    });
    return deepProfile;
  }

}

export = DeepProfileSerialiser;