import CreeperType = require("./CreeperType");
import CreeperAction = require("./CreeperAction");
import CreeperKeywords = require("./CreeperKeywords");
import CreeperFrequency = require("./CreeperFrequency");

class Creeper {

  creeperId: number;
  name: string;
  type: CreeperType;
  actions: Array<CreeperAction>;
  keywords: CreeperKeywords;
  isEnabled: boolean;
  frequency: CreeperFrequency;

  constructor (creeperId: number, name: string, type: CreeperType, keywords: CreeperKeywords, actions: Array<CreeperAction>, isEnabled: boolean, frequency: CreeperFrequency) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.actions = actions;
    this.isEnabled = isEnabled;
    this.frequency = frequency;
  }

}

export = Creeper;