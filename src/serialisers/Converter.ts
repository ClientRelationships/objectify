import Serialiser = require("./Serialiser");

import Converter from "../classes/Converter";
import ConverterPurpose from "../classes/ConverterPurpose";

class ConverterSerialiser implements Serialiser {

  toRaw (converter: Converter): Object {
    return {
      "name": converter.name,
      "grabber": converter.grabber,
      "explainer": converter.explainer,
      "persuader": converter.persuader,
      "imageUrl": converter.imageUrl,
      "forwardUrl": converter.forwardUrl,
      "callToAction": converter.callToAction,
      "deepProfileOnSubmit": (converter.deepProfileOnSubmit === true ? 1 : 0),
      "purpose": converter.purpose.value,
      "autoGoToForwardUrl": (converter.autoGoToForwardUrl === true ? 1 : 0)
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
      (object.deepProfileOnSubmit === 1 ? true : false),
      new ConverterPurpose(object.purpose),
      (object.autoGoToForwardUrl === 1 ? true : false),
      object._links
    );
  }

}

export = ConverterSerialiser;