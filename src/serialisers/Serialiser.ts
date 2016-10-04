interface Serialiser {
  name: string;
  toRaw (object: Object): any;
  fromRaw (any: Object): Object;
}

export = Serialiser;