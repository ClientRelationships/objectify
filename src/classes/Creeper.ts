import CreeperType = require("./CreeperType");
import CreeperAction = require("./CreeperAction");
import CreeperKeywords = require("./CreeperKeywords");
import CreeperFrequency = require("./CreeperFrequency");

class Creeper {

  creeperId?: number;
  clientId?: number;
  name: string;
  type: CreeperType;
  actions: Array<CreeperAction>;
  keywords: CreeperKeywords;
  isEnabled: boolean;
  frequency: CreeperFrequency;
  delay: number;

  constructor (creeperId: number, name: string, type: CreeperType, keywords: CreeperKeywords, actions: Array<CreeperAction>, isEnabled: boolean, frequency: CreeperFrequency, delay: number) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.actions = actions;
    this.isEnabled = isEnabled;
    this.frequency = frequency;
    this.delay = delay;
  }

}

export = Creeper;