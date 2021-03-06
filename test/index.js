"use strict";

const chai = require("chai");
const expect = chai.expect;

const objectify = require("../dist");

return describe("Objectify", function () {

  //
  // GENERIC
  //

  const type = "Dog";
  const rawObject = {
    "name": "Jennifer",
    "age": 10
  };
  let object;

  it("converts a raw object into an object", function (done) {
    let newObject = objectify.fromRaw(type, rawObject);
    object = newObject;
    expect(newObject.constructor.name).to.equal(type);
    return done();
  });

  it("converts an object into a raw object", function (done) {
    let newRawObject = objectify.toRaw(type, object);
    expect(newRawObject).to.deep.equal(rawObject);
    return done();
  });

  it("makes an object", function (done) {
    let newObject = objectify.factory(type).make(rawObject.name, rawObject.age);
    expect(newObject.constructor.name).to.equal(type);
    return done();
  });

  //
  // CREEPERS
  //

  const client = {
    "clientId": 1024,
    "twitter": "author"
  };

  const tweetByClient = {
    "text": "A tweet containing 'keyword'",
    "user": {
      "screen_name": "author",
      "location": ""
    }
  };

  const tweetNotByClient = {
    "text": "A tweet containing 'keyword'",
    "user": {
      "screen_name": "not_author",
      "location": "",
      "lang": "en"
    }
  };

  const tweetRetweet1 = {
    "text": "RT A tweet containing 'keyword'",
    "user": {
      "screen_name": "not_author",
      "location": "",
      "lang": "en"
    }
  };

  const tweetRetweet2 = {
    "text": "RT A tweet containing 'keyword'",
    "retweeted_status": {
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    },
    "user": {
      "screen_name": "not_author",
      "location": "",
      "lang": "en"
    }
  };

  const makeCreeper = function makeCreeper (locations) {
    const creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword", "berlin", "jam"]);
    creeper.setClient(client);
    creeper.setGeo(locations || []);
    creeper.disable();
    return creeper;
  };

  const makeRawCreeper = function makeRawCreeper (locations) {
    const creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword", "berlin", "jam"]);
    creeper.setClient(client);
    creeper.setGeo(locations || []);
    creeper.disable();
    creeper.tweeted(tweetNotByClient);
    const rawCreeper = objectify.toRaw("Creeper", creeper);
    return rawCreeper;
  };

  const makeCreeperAction = function makeCreeperAction () {
    const creeperAction = objectify.factory("CreeperAction").make("Reply", "Text.");
    return creeperAction;
  };

  const makeRawCreeperAction = function makeRawCreeperAction () {
    const creeperAction = objectify.factory("CreeperAction").make("Reply", "Text.");
    const rawCreeperAction = objectify.toRaw("CreeperAction", creeperAction);
    return rawCreeperAction;
  };

  const makeCreeperFrequencies = function makeCreeperFrequencies () {
    const creeperFrequencies = objectify.factory("CreeperFrequencies").make();
    return creeperFrequencies;
  };

  it("makes a creeper with the correct properties (type, frequency, delay, client...)", function (done) {
    const creeper = makeCreeper(["London"]);
    expect(creeper.type.toString()).to.equal("Autochirp");
    expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
    expect(creeper.delay).to.equal(300);
    expect(creeper.client).to.deep.equal(client);
    expect(creeper.state).to.equal("disabled");
    expect(creeper.deepProfileOnFind).to.equal(false);
    expect(creeper.deepProfileOnAction).to.equal(false);
    expect(creeper.geofilter).to.include("London");
    return done();
  });

  it("makes a creeper which doesn't reply to a tweet which is a reply to someone else", function (done2) {
    const creeper = makeCreeper();
    const tweetInReplyTo = {
      "text": "@someone_else A tweet containing 'keyword'",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetInReplyTo, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to retweets", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetRetweet1, 10)).to.equal(false);
    expect(creeper.canTweet(tweetRetweet2, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which replies to a tweet which is not by the client and it hasn't already replied to", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetNotByClient, 10)).to.equal(true);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet which is not by the client and it has already replied to", function (done2) {
    const creeper = makeCreeper();
    creeper.tweeted(tweetNotByClient);
    expect(creeper.canTweet(tweetNotByClient, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet by the client", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetByClient, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet which is by a user with a low number of followers", function (done2) {
    const creeper = makeCreeper();
    const tweetByFewFollowersUser = {
      "text": "spam spam spam",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "followers_count": 5,
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetByFewFollowersUser, 10)).to.equal(false);
    return done2();
  });

  it("makes a London creeper which replies to a tweet in London", function (done2) {
    const creeper = makeCreeper(["London"]);
    const tweetInLondon = {
      "text": "I live in London! 'keyword'",
      "user": {
        "screen_name": "not_author",
        "location": "London",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetInLondon, 10)).to.equal(true);
    return done2();
  });

  it("makes a London creeper which doesn't reply to a tweet in Manchester", function (done2) {
    const creeper = makeCreeper(["London"]);
    const tweetInManchester = {
      "text": "I live in Manchester! 'keyword'",
      "user": {
        "screen_name": "not_author",
        "location": "Manchester",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetInManchester, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a spammy tweet", function (done2) {
    const creeper = makeCreeper();
    const tweetSpammy = {
      "text": "https://t.co/blah #love #london @jimbo @bob",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetSpammy, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet which is nothing to do with the keywords at all", function (done2) {
    const creeper = makeCreeper();
    const tweetKeywordNotInAWord = {
      "text": "blah blah blah",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetKeywordNotInAWord, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which replies to a tweet where the keyword is not part of another word", function (done2) {
    const creeper = makeCreeper();
    const tweetKeywordNotInAWord = {
      "text": "Put jam on my face",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetKeywordNotInAWord, 10)).to.equal(true);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet where the keyword is part of another word", function (done2) {
    const creeper = makeCreeper();
    const tweetKeywordInAWord = {
      "text": "I love James!",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetKeywordInAWord, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet by a foreigner", function (done2) {
    const creeper = makeCreeper();
    const tweetForeigner = {
      "text": "I am German (but write in English)",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "de"
      }
    };
    expect(creeper.canTweet(tweetForeigner, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a foreign tweet", function (done2) {
    const creeper = makeCreeper();
    const tweetForeigner = {
      "text": "Ich komme aus Berlin (und schreibe auf Deutsch)",
      "lang": "de",
      "user": {
        "screen_name": "not_author",
        "location": ""
      }
    };
    expect(creeper.canTweet(tweetForeigner, 10)).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to an automated tweet from YouTube", function (done2) {
    const creeper = makeCreeper();
    const tweetYouTube = {
      "text": "I liked a @YouTube video",
      "user": {
        "screen_name": "not_author",
        "location": "",
        "lang": "en"
      }
    };
    expect(creeper.canTweet(tweetYouTube, 10)).to.equal(false);
    return done2();
  });

  it("serialises a creeper (toRaw)", function (done) {
    const rawCreeper = makeRawCreeper(["London"]);
    expect(rawCreeper.type).to.equal(2);
    expect(rawCreeper.actionFrequency).to.equal(30);
    expect(rawCreeper.delay).to.equal(300);
    expect(rawCreeper.state).to.equal("disabled");
    expect(rawCreeper.handlesTweetedAt).to.equal(tweetNotByClient.user.screen_name);
    expect(rawCreeper.client).to.equal(undefined);
    expect(rawCreeper.deepProfileOnFind).to.equal(0);
    expect(rawCreeper.deepProfileOnAction).to.equal(0);
    expect(rawCreeper.geo).to.equal("London");
    return done();
  });

  it("deserialises a creeper (fromRaw)", function (done) {
    const rawCreeper = makeRawCreeper("London");
    const creeper = objectify.fromRaw("Creeper", rawCreeper);
    expect(creeper.type.toString()).to.equal("Autochirp");
    expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
    expect(creeper.delay).to.equal(300);
    expect(creeper.state).to.equal("disabled");
    expect(creeper.handlesTweetedAt).to.include(tweetNotByClient.user.screen_name);
    expect(creeper.handlesTweetedAt).to.not.include(tweetByClient.user.screen_name);
    expect(creeper.client).to.equal(undefined);
    expect(creeper.deepProfileOnFind).to.equal(false);
    expect(creeper.deepProfileOnAction).to.equal(false);
    expect(creeper.geofilter).to.include("London");
    return done();
  });

  it("makes a creeper action", function (done) {
    const creeperAction = makeCreeperAction();
    expect(creeperAction.type.toString()).to.equal("Reply");
    expect(creeperAction.data.toString()).to.be.a("string");
    return done();
  });

  it("serialises a creeper action (toRaw)", function (done) {
    const rawCreeperAction = makeRawCreeperAction();
    expect(rawCreeperAction.data).to.be.a("string");
    return done();
  });

  it("deserialises a creeper action (fromRaw)", function (done) {
    const rawCreeperAction = makeRawCreeperAction();
    const creeperAction = objectify.fromRaw("CreeperAction", rawCreeperAction);
    expect(creeperAction.data).to.be.a("string");
    return done();
  });

  it("makes creeper frequencies", function (done) {
    const creeperFrequencies = makeCreeperFrequencies();
    expect(creeperFrequencies).length.to.be.at.least(0);
    return done();
  });

  //
  // CONVERTERS
  //

  const makeConverter = function makeConverter () {
    const converter = objectify.factory("Converter").make(undefined, "Get Customers");
    return converter;
  };

  const makeRawConverter = function makeRawConverter () {
    const converter = objectify.factory("Converter").make(undefined, "Get Customers");
    const rawConverter = objectify.toRaw("Converter", converter);
    return rawConverter;
  };

  it("makes a converter", function (done) {
    const converter = makeConverter();
    expect(converter.name).to.equal("Get Customers");
    expect(converter.deepProfileOnSubmit).to.equal(false);
    expect(converter.purpose.toString()).to.equal("Default");
    expect(converter.getFields()).to.be.an("array");
    expect(converter.autoGoToForwardUrl).to.equal(false);
    return done();
  });

  it("serialises a converter (toRaw)", function (done) {
    const rawConverter = makeRawConverter();
    expect(rawConverter.name).to.equal("Get Customers");
    expect(rawConverter.deepProfileOnSubmit).to.equal(0);
    expect(rawConverter.purpose).to.equal(1);
    expect(rawConverter.autoGoToForwardUrl).to.equal(0);
    return done();
  });

  it("deserialises a converter (fromRaw)", function (done) {
    const rawConverter = makeRawConverter();
    const converter = objectify.fromRaw("Converter", rawConverter);
    expect(converter.name).to.equal("Get Customers");
    expect(converter.deepProfileOnSubmit).to.equal(false);
    expect(converter.purpose.toString()).to.equal("Default");
    expect(converter.getFields()).to.be.an("array");
    expect(converter.autoGoToForwardUrl).to.equal(false);
    return done();
  });

  //
  // DEEP PROFILES
  //

  const makeRawDeepProfile = function makeRawDeepProfile () {
    const deepProfile = objectify.factory("DeepProfile").make(undefined);
    deepProfile.source = "feedback";
    deepProfile.setField("generic", "TwitterHandle", "jadaradix");
    deepProfile.setField("feedback", "firstName", "James");
    deepProfile.setField("feedback", "lastName", "Garner");
    deepProfile.setField("creeper", "keywords", ["apple", "pie"]);
    const rawDeepProfile = objectify.toRaw("DeepProfile", deepProfile);
    return rawDeepProfile;
  };

  it("makes a deep profile", function (done) {
    const deepProfile = objectify.factory("DeepProfile").make(undefined);
    return done();
  });

  it("serialises a deep profile (toRaw)", function (done) {
    const rawDeepProfile = makeRawDeepProfile();
    expect(rawDeepProfile.generic_TwitterHandle).to.equal("jadaradix");
    expect(rawDeepProfile.feedback_firstName).to.equal("James");
    expect(rawDeepProfile.feedback_lastName).to.equal("Garner");
    return done();
  });

  it("deserialises a deep profile (fromRaw)", function (done) {
    const rawDeepProfile = makeRawDeepProfile();
    const deepProfile = objectify.fromRaw("DeepProfile", rawDeepProfile);
    expect(deepProfile.getField("generic", "TwitterHandle")).to.equal("jadaradix");
    expect(deepProfile.getField("feedback", "firstName")).to.equal("James");
    expect(deepProfile.getField("feedback", "lastName")).to.equal("Garner");
    expect(deepProfile.getField("creeper", "keywords")).to.include("apple");
    expect(deepProfile.getField("creeper", "keywords")).to.include("pie");
    expect(deepProfile.getField("creeper", "keywords")).to.not.include("fish");
    expect(deepProfile.getName()).to.equal("James Garner");
    return done();
  });

});
