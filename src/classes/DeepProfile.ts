// ES6 Map support
// bodged from https://www.reddit.com/r/typescript/comments/39taz3/map_class_in_typescript/cs69xpj/
/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />

export default class DeepProfile {

  deepProfileId: number;
  status: string;
  whenUnprocessed: string;
  whenProcessed: string;
  source: string;
  converterId: number;
  creeperId: number;
  creeperActionId: number;
  fields: Map<string, string>;

  constructor (
    deepProfileId: number,
    status: string = null,
    whenUnprocessed: string = "",
    whenProcessed: string = "",
    source: string = null,
    converterId: number = null,
    creeperId: number = null,
    creeperActionId: number = null,
    fields = new Map<string, string>()
  ) {
    this.deepProfileId = deepProfileId;
    this.status = status;
    this.whenUnprocessed = whenUnprocessed;
    this.whenProcessed = whenProcessed;
    this.source = source;
    this.converterId = converterId;
    this.creeperId = creeperId;
    this.creeperActionId = creeperActionId;
    this.fields = fields;
  }

  setField (key, value): string {
    this.fields.set(key, value);
    return value;
  }

  toString (): string {
    return `${this.source} (ID ${this.deepProfileId})`;
  }

}