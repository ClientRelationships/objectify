import CreeperType = require("./CreeperType");
import CreeperAction = require("./CreeperAction");
import CreeperKeywords = require("./CreeperKeywords");

class Creeper {

  creeperId: number;
  name: string;
  type: CreeperType;
  actions: Array<CreeperAction>;
  keywords: CreeperKeywords;
  isEnabled: boolean;

  constructor (creeperId: number, name: string, type: CreeperType, keywords: CreeperKeywords, actions: Array<CreeperAction>, isEnabled: boolean) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.actions = actions;
    this.isEnabled = isEnabled;
  }

}

export = Creeper;