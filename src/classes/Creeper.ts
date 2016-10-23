import CreeperType from "../classes/CreeperType";
import CreeperAction from "../classes/CreeperAction";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperHandlesTweetedAt from "../classes/CreeperHandlesTweetedAt";
import CreeperFrequency from "../classes/CreeperFrequency";

export default class Creeper {

  creeperId: number;
  client: Object;
  name: string;
  type: CreeperType;
  actions: Array<CreeperAction>;
  keywords: CreeperKeywords;
  isEnabled: boolean;
  frequency: CreeperFrequency;
  delay: number;
  handlesTweetedAt: CreeperHandlesTweetedAt;

  actionsCountStore: Object;
  autochirp: Object;

  constructor (creeperId: number, name: string, type: CreeperType, keywords: CreeperKeywords, actions: Array<CreeperAction> = [], isEnabled: boolean = true, frequency: CreeperFrequency = new CreeperFrequency(30), delay: number = 5 * 60, handlesTweetedAt: CreeperHandlesTweetedAt = new CreeperHandlesTweetedAt()) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.isEnabled = isEnabled;
    this.frequency = frequency;
    this.delay = delay;
    this.handlesTweetedAt = handlesTweetedAt;
    if (actions) {
      this.actions = actions;
      this.actionsCountStore = {};
      this.actions.map(action => action.type.toString()).forEach(actionTypeString => {
        this.actionsCountStore["unique-action-current-" + actionTypeString] = Math.floor(Math.random() * this.actions.length);
      });
    }
    // from vo-runners and vo-outcomes
    this.autochirp = {
      replies: [],
      summaryStatistics: {},
      genderSplit: {}
    };
  }

  setClient (client: Object): this {
    this.client = client;
    return this;
  }

  toString (): string {
    return `${this.name} (${this.keywords})`;
  }

  bumpAction (type: string): number {
    if (this.actionsCountStore["unique-action-current-" + type] === this.actions.length - 1) {
      console.log(" -> lastActionCount in creeperBumpAction is at upper bound; changing...");
      return (this.actionsCountStore["unique-action-current-" + type] = 0);
    } else {
      console.log(" -> lastActionCount in creeperBumpAction is NOT at upper bound; incrementing...");
      return (this.actionsCountStore["unique-action-current-" + type] += 1);
    }
  };

  canTweet (tweet: any, currentSeconds: number): boolean {
    if (this.handlesTweetedAt.contains(tweet.user.screen_name)) return false;
    if (tweet.text.indexOf("@") === 0) return false;
    if (currentSeconds >= this.frequency.value) return false;
    if (tweet.user.screen_name.toLowerCase() === this.client.twitter.toLowerCase()) return false;
    return true;
  }

  tweeted (tweet: any): this {
    this.handlesTweetedAt.add(tweet.user.screen_name);
    return this;
  }

  enable (): this {
    this.isEnabled = true;
    return this;
  }

  disable (): this {
    this.isEnabled = false;
    return this;
  }

}