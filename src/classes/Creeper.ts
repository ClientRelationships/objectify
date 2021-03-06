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

  canTweet (tweet: any, currentSeconds: number): boolean {
    console.log("----------------");
    console.log(tweet);
    console.log("----------------");
    const tweetText = tweet.text.toLowerCase();
    const elements = tweetText.split(" ");

    // don't reply to a tweet which is nothing to do with the keywords at all
    const keywordsWithinTheTweet = this.keywords.map(keyword => keyword.toLowerCase()).filter(keyword => tweetText.indexOf(keyword) !== -1);
    if (keywordsWithinTheTweet.length === 0) {
      console.log("canTweet decision", "don't reply to a tweet which is nothing to do with the keywords at all");
      return false;
    }
    // don't annoy people (already tweeted at them)
    if (this.handlesTweetedAt.contains(tweet.user.screen_name)) {
      console.log("canTweet decision", "don't annoy people (already tweeted at them)");
      return false;
    }
    // don't spam (tweet too often)
    if (currentSeconds >= this.frequency.value) {
      console.log("canTweet decision", "don't spam (tweet too often)");
      return false;
    }
    // don't tweet at users with tiny number of followers - they are so often bots
    if (tweet.user.followers_count < 50) {
      console.log("canTweet decision", "don't tweet at users with tiny number of followers - they are so often bots");
      return false;
    }
    // don't barge into conversations
    if (tweetText.indexOf("@") === 0) {
      console.log("canTweet decision", "don't barge into conversations");
      return false;
    }
    // don't screw with retweets (RT syntax)
    if (tweetText.indexOf("rt ") === 0) {
      console.log("canTweet decision", "don't screw with retweets (RT syntax)");
      return false;
    }
    // don't screw with retweets (object property)
    if (tweet.retweeted_status !== undefined) {
      console.log("canTweet decision", "don't screw with retweets (RT syntax)");
      return false;
    }
    // don't tweet at yourself
    if (tweet.user.screen_name.toLowerCase() === this.client.twitter.toLowerCase()) {
      console.log("canTweet decision", "don't tweet at yourself");
      return false;
    }
    // don't tweet if geofilter is specified and this doesn't work out
    if (this.geofilter.length > 0) {
      if (!tweet.user.location) { // null ???
        // user doesn't specify a location, so can't be sure - don't tweet
        console.log("canTweet decision", "don't tweet if geofilter is specified and this doesn't work out -> user doesn't specify a location, so can't be sure - don't tweet");
        return false;
      } else {
        // user specifies a location, check
        const matchingLocations = this.geofilter.filter(location =>
          tweet.user.location.toLowerCase().indexOf(location.toLowerCase()) !== -1
        );
        if (matchingLocations.length === 0) {
          console.log("canTweet decision", "don't tweet if geofilter is specified and this doesn't work out -> user specifies a location, check");
          return false;
        }
      }
    }
    // don't reply to an automated tweet (YouTube)
    if (tweet.text.indexOf("liked a @YouTube video") !== -1) {
      console.log("canTweet decision", "don't reply to an automated tweet (YouTube)");
      return false;
    }
    // don't reply to an obviously spammy tweet (if all hashtags etc)
    const elementsLinks = elements.filter(element => element.indexOf("http:") === 0 || element.indexOf("https:") === 0);
    const elementsHashtags = elements.filter(element => element[0] === "#");
    const elementsMentions = elements.filter(element => element[0] === "@");
    if (elements.length === elementsLinks.length + elementsHashtags.length + elementsMentions.length) {
      console.log("canTweet decision", "don't tweet at an obviously spammy tweet");
      return false;
    }
    // don't reply to a tweet where any keyword is part of another word
    // this code is "self documenting"...
    let keywordIssue = false;
    this.keywords.forEach(keyword => {
      if (tweetText.indexOf(keyword.toLowerCase()) !== -1) {
        // woohoo, this keyword was mentioned!
        let regex = new RegExp(keyword, "gi"), result, indices = [];
        while ((result = regex.exec(tweetText))) {
          indices.push(result.index);
        }
        let allowedWrappingCharacters = [" ", "\"", "'", "!", "?", ".", ",", ";", "(", ")", "/"];
        let indicesWithASpaceBeforeOrAfter = indices.filter(index => {
          if (index === 0) {
            // first: needs a space after it
            return (allowedWrappingCharacters.indexOf(tweetText[index + keyword.length]) !== -1);
          } else if (index === tweetText.length - keyword.length) {
            // last: needs a space before it
            return (allowedWrappingCharacters.indexOf(tweetText[index - 1]) !== -1);
          } else {
            // middle: needs a space before it AND after it
            return (allowedWrappingCharacters.indexOf(tweetText[index - 1]) !== -1 && allowedWrappingCharacters.indexOf(tweetText[index + keyword.length]) !== -1);
          }
        });
        if (indicesWithASpaceBeforeOrAfter.length === 0) keywordIssue = true;
      }
    });
    if (keywordIssue) {
      console.log("canTweet decision", "don't reply to a tweet where any keyword is part of another word");
      return false;
    }
    // don't tweet at foreigners
    if (tweet.user.lang !== "en") {
      console.log("canTweet decision", "don't tweet at foreigners");
      return false;
    }
    // don't reply to a foreign tweet
    if (tweet.lang && tweet.lang !== "en") {
      console.log("canTweet decision", "don't reply to a foreign tweet");
      return false;
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
