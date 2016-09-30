interface Serialiser {
  name: string;
  toRaw (object: Object): Object;
  fromRaw (object: Object): Object;
}

export = Serialiser;