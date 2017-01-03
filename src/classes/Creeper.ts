import CreeperType from "../classes/CreeperType";
import CreeperAction from "../classes/CreeperAction";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperHandlesTweetedAt from "../classes/CreeperHandlesTweetedAt";
import CreeperFrequency from "../classes/CreeperFrequency";

export default class Creeper {

  creeperId: number;
  client: any;
  converter: any;
  name: string;
  type: CreeperType;
  actions: Array<CreeperAction>;
  keywords: CreeperKeywords;
  isEnabled: boolean;
  isEnabledByUs: boolean;
  frequency: CreeperFrequency;
  delay: number;
  handlesTweetedAt: CreeperHandlesTweetedAt;
  converterId: number;

  actionsCountStore: Object;
  autochirp: Object;

  constructor (
    creeperId: number,
    name: string,
    type: CreeperType,
    keywords: CreeperKeywords,
    actions: Array<CreeperAction> = [],
    isEnabled: boolean = false,
    isEnabledByUs: boolean = true,
    frequency: CreeperFrequency = new CreeperFrequency(30),
    delay: number = 5 * 60, 
    handlesTweetedAt: CreeperHandlesTweetedAt = new CreeperHandlesTweetedAt(),
    converterId = null
  ) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.isEnabled = isEnabled;
    this.isEnabledByUs = isEnabledByUs;
    this.frequency = frequency;
    this.delay = delay;
    this.handlesTweetedAt = handlesTweetedAt;
    this.converterId = converterId;
    if (actions) {
      this.actions = actions;
      this.actionsCountStore = {};
      this.actions.map(action => action.type.toString()).forEach(actionTypeString => {
        this.actionsCountStore["unique-action-current-" + actionTypeString] = Math.floor(Math.random() * this.actions.length);
      });
    }
  }

  setClient (client: any): this {
    this.client = client;
    return this;
  }

  setConverter (converter: any): this {
    this.converter = converter;
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
    // don't annoy people (already tweeted at them)
    if (this.handlesTweetedAt.contains(tweet.user.screen_name)) return false;
    // don't barge into conversations
    if (tweet.text.indexOf("@") === 0) return false;
    // don't screw with retweets (RT syntax)
    if (tweet.text.indexOf("RT ") === 0) return false;
    // don't screw with retweets (object property)
    if (tweet.retweeted_status !== undefined) return false;
    // don't spam (tweet too often)
    if (currentSeconds >= this.frequency.value) return false;
    // don't tweet at yourself
    if (tweet.user.screen_name.toLowerCase() === this.client.twitter.toLowerCase()) return false;
    // tweet
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