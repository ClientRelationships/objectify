import CreeperType from "../classes/CreeperType";
import CreeperAction from "../classes/CreeperAction";
import CreeperKeywords from "../classes/CreeperKeywords";
import CreeperLocation from "../classes/CreeperLocation";
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
  state: string;
  isEnabledByUs: boolean;
  frequency: CreeperFrequency;
  delay: number;
  handlesTweetedAt: CreeperHandlesTweetedAt;
  converterId: number;
  deepProfileOnFind: boolean;
  deepProfileOnAction: boolean;
  geofilter: CreeperLocation;

  actionsCountStore: Object;
  autochirp: Object;

  constructor (
    creeperId: number,
    name: string,
    type: CreeperType,
    keywords: CreeperKeywords,
    actions: Array<CreeperAction> = [],
    state: string = "disabled",
    isEnabledByUs: boolean = false,
    frequency: CreeperFrequency = new CreeperFrequency(30),
    delay: number = 5 * 60,
    handlesTweetedAt: CreeperHandlesTweetedAt = new CreeperHandlesTweetedAt(),
    converterId = null,
    deepProfileOnFind: boolean = false,
    deepProfileOnAction: boolean = false,
    geofilter: CreeperLocation = new CreeperLocation()
  ) {
    this.creeperId = creeperId;
    this.name = name;
    this.type = type;
    this.keywords = keywords;
    this.state = state;
    this.isEnabledByUs = isEnabledByUs;
    this.frequency = frequency;
    this.delay = delay;
    this.handlesTweetedAt = handlesTweetedAt;
    this.converterId = converterId;
    this.deepProfileOnFind = deepProfileOnFind;
    this.deepProfileOnAction = deepProfileOnAction;
    this.geofilter = geofilter;
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

  canTweet (tweet: any, currentSeconds: number, keyword: string): boolean {
    const elements = tweet.text.split(" ");
    // don't annoy people (already tweeted at them)
    if (this.handlesTweetedAt.contains(tweet.user.screen_name)) return false;
    // don't tweet at users with tiny number of followers - they are so often bots
    if (tweet.user.followers_count < 50) return false;
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
    // don't tweet if geofilter is specified and user location is specified and they are similar
    if (this.geofilter.length > 0 && tweet.user.location !== null) {
      const matchingLocations = this.geofilter.filter(location =>
        location.toLowerCase() === tweet.user.location.toLowerCase()
      );
      if (matchingLocations.length === 0) {
        return false;
      }
    }
    // don't tweet at an obviously spammy tweet
    const elementsLinks = elements.filter(element => element.indexOf("http:") === 0 || element.indexOf("https:") === 0);
    const elementsHashtags = elements.filter(element => element[0] === "#");
    const elementsMentions = elements.filter(element => element[0] === "@");
    if (elements.length === elementsLinks.length + elementsHashtags.length + elementsMentions.length) {
      return false;
    }
    // don't reply to a tweet where the keyword is part of another word
    // this code is "self documenting"
    if (tweet.text.length > keyword.length) {
      var regex = new RegExp(keyword, "gi"), result, indices = [];
      while ((result = regex.exec(tweet.text))) {
        indices.push(result.index);
      }
      if (indices.length === 0) return false; // it was never mentioned... stupid twitter
      let allowedWrappingCharacters = [" ", "\"", "'", "!", ".", ","];
      let indicesWithASpaceBeforeOrAfter = indices.filter(index => {
        if (index === 0) {
          // first: needs a space after it
          return (allowedWrappingCharacters.indexOf(tweet.text[index + keyword.length]) !== -1);
        } else if (index === tweet.text.length - keyword.length) {
          // last: needs a space before it
          return (allowedWrappingCharacters.indexOf(tweet.text[index - 1]) !== -1);
        } else {
          // middle: needs a space before it AND after it
          return (allowedWrappingCharacters.indexOf(tweet.text[index - 1]) !== -1 && allowedWrappingCharacters.indexOf(tweet.text[index + keyword.length]) !== -1);
        }
      });
      // console.log('tweet text', tweet.text);
      // console.log('indices', indices);
      // console.log('indicesWithASpaceBeforeOrAfter', indicesWithASpaceBeforeOrAfter);
      if (indicesWithASpaceBeforeOrAfter.length === 0) return false;
      // don't tweet at foreigners
      if (tweet.user.lang && tweet.user.lang !== "en") {
        return false;
      }
    }
    // tweet
    return true;
  }

  tweeted (tweet: any): this {
    this.handlesTweetedAt.add(tweet.user.screen_name);
    return this;
  }

  enable (): this {
    this.state = "enabled";
    return this;
  }

  disable (): this {
    this.state = "disabled";
    return this;
  }

  setGeo (geofilter: CreeperLocation): this {
    this.geofilter = geofilter;
    return this;
  }

}
