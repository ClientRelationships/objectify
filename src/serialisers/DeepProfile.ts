import Serialiser = require("./Serialiser");

import DeepProfile from "../classes/DeepProfile";

class DeepProfileSerialiser implements Serialiser {

  toRaw (deepProfile: DeepProfile): Object {
    let o = {
      "status": deepProfile.status,
      "whenUnprocessed": deepProfile.whenProcessed,
      "whenProcessed": deepProfile.whenProcessed,
      "source": deepProfile.source,
      "converterId": deepProfile.converterId,
      "creeperId": deepProfile.creeperId,
      "creeperActionId": deepProfile.creeperActionId
    };
    deepProfile.fields.forEach((value, key) => {
      o[`field${key}`] = value;
    });
    return o;
  }

  fromRaw (object): DeepProfile {
    let deepProfile = new DeepProfile(
      object.deepProfileId,
      object.status,
      object.whenUnprocessed,
      object.whenProcessed,
      object.source,
      object.converterId,
      object.creeperId,
      object.creeperActionId
    );
    let fieldKeys = Object.keys(object).filter(
      key => key.substring(0, "field".length) === "field"
    );
    fieldKeys.forEach(key => {
      deepProfile.setField(key.substring("field".length), object[key]);
    });
    return deepProfile;
  }

}

export = DeepProfileSerialiser;