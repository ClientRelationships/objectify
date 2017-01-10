import Factory = require("./Factory");

import DeepProfile from "../classes/DeepProfile";

class DeepProfileFactory implements Factory {

  make (...constructorArguments: Array<any>): DeepProfile {
    const object = Object.create(DeepProfile.prototype);
    DeepProfile.apply(object, constructorArguments);
    return object;
  }

}

export = DeepProfileFactory;