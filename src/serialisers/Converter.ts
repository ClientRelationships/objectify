import Serialiser = require("./Serialiser");

import Converter from "../classes/Converter";

class ConverterSerialiser implements Serialiser {

  toRaw (converter: Converter): Object {
    return {
      "name": converter.name,
      "grabber": converter.grabber,
      "explainer": converter.explainer,
      "persuader": converter.persuader,
      "imageUrl": converter.imageUrl,
      "forwardUrl": converter.forwardUrl,
      "callToAction": converter.callToAction
    };
  }

  fromRaw (object): Converter {
    const id = object.converterId;
    return new Converter(
      id,
      object.name,
      object.grabber,
      object.explainer,
      object.persuader,
      object.imageUrl,
      object.forwardUrl,
      object.callToAction,
      object._links
    );
  }

}

export = ConverterSerialiser;