interface Serialiser {

  toRaw (object: Object): any;
  fromRaw (any: Object): Object;

}

export = Serialiser;