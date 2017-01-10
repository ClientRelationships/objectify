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
    "text": "A tweet containing 'keyword 1'",
    "user": {
      "screen_name": "author"
    }
  };

  const tweetNotByClient = {
    "text": "A tweet containing 'keyword 1'",
    "user": {
      "screen_name": "not_author"
    }
  };

  const tweetInReplyTo = {
    "text": "@someone_else A tweet containing 'keyword 1'",
    "user": {
      "screen_name": "not_author"
    }
  };

  const tweetRetweet1 = {
    "text": "RT A tweet containing 'keyword 1'",
    "user": {
      "screen_name": "not_author"
    }
  };

  const tweetRetweet2 = {
    "text": "RT A tweet containing 'keyword 1'",
    "retweeted_status": {
      "user": {
        "screen_name": "not_author"
      }
    },
    "user": {
      "screen_name": "not_author"
    }
  };

  const makeCreeper = function makeCreeper () {
    const creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"]);
    creeper.setClient(client);
    creeper.disable();
    return creeper;
  };

  const makeRawCreeper = function makeRawCreeper () {
    const creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"]);
    creeper.setClient(client);
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
    const creeper = makeCreeper();
    expect(creeper.type.toString()).to.equal("Autochirp");
    expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
    expect(creeper.delay).to.equal(300);
    expect(creeper.client).to.deep.equal(client);
    expect(creeper.isEnabled).to.equal(false);
    expect(creeper.isEnabledByUs).to.equal(false);
    expect(creeper.deepProfileOnFind).to.equal(false);
    expect(creeper.deepProfileOnAction).to.equal(false);
    return done();
  });

  it("makes a creeper which doesn't reply to a tweet which is a reply to someone else", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetInReplyTo, "reply text")).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to retweets", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetRetweet1, "reply text")).to.equal(false);
    expect(creeper.canTweet(tweetRetweet2, "reply text")).to.equal(false);
    return done2();
  });

  it("makes a creeper which replies to a tweet which is not by the author and it hasn't already replied to", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetNotByClient, "reply text")).to.equal(true);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet which is not by the author and it has already replied to", function (done2) {
    const creeper = makeCreeper();
    creeper.tweeted(tweetNotByClient);
    expect(creeper.canTweet(tweetNotByClient, "reply text")).to.equal(false);
    return done2();
  });

  it("makes a creeper which doesn't reply to a tweet by the client", function (done2) {
    const creeper = makeCreeper();
    expect(creeper.canTweet(tweetByClient, "reply text")).to.equal(false);
    return done2();
  });

  it("serialises a creeper (toRaw)", function (done) {
    const rawCreeper = makeRawCreeper();
    expect(rawCreeper.type).to.equal(2);
    expect(rawCreeper.actionFrequency).to.equal(30);
    expect(rawCreeper.delay).to.equal(300);
    expect(rawCreeper.isEnabled).to.equal(0);
    expect(rawCreeper.isEnabledByUs).to.equal(0);
    expect(rawCreeper.handlesTweetedAt).to.equal(tweetNotByClient.user.screen_name);
    expect(rawCreeper.client).to.equal(undefined);
    expect(rawCreeper.deepProfileOnFind).to.equal(0);
    expect(rawCreeper.deepProfileOnAction).to.equal(0);
    return done();
  });

  it("deserialises a creeper (fromRaw)", function (done) {
    const rawCreeper = makeRawCreeper();
    const creeper = objectify.fromRaw("Creeper", rawCreeper);
    expect(creeper.type.toString()).to.equal("Autochirp");
    expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
    expect(creeper.delay).to.equal(300);
    expect(creeper.isEnabled).to.equal(false);
    expect(creeper.isEnabledByUs).to.equal(false);
    expect(creeper.handlesTweetedAt).to.include(tweetNotByClient.user.screen_name);
    expect(creeper.handlesTweetedAt).to.not.include(tweetByClient.user.screen_name);
    expect(creeper.client).to.equal(undefined);
    expect(creeper.deepProfileOnFind).to.equal(false);
    expect(creeper.deepProfileOnAction).to.equal(false);
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
    return done();
  });

  it("serialises a converter (toRaw)", function (done) {
    const rawConverter = makeRawConverter();
    expect(rawConverter.name).to.equal("Get Customers");
    expect(rawConverter.deepProfileOnSubmit).to.equal(0);
    return done();
  });

  it("deserialises a converter (fromRaw)", function (done) {
    const rawConverter = makeRawConverter();
    const converter = objectify.fromRaw("Converter", rawConverter);
    expect(converter.name).to.equal("Get Customers");
    expect(converter.deepProfileOnSubmit).to.equal(false);
    return done();
  });

  //
  // DEEP PROFILES
  //

  const makeDeepProfile = function makeDeepProfile () {
    const deepProfile = objectify.factory("DeepProfile").make(undefined);
    deepProfile.setField("TwitterHandle", "jadaradix");
    return deepProfile;
  };

  const makeRawDeepProfile = function makeRawDeepProfile () {
    const deepProfile = objectify.factory("DeepProfile").make(undefined);
    deepProfile.setField("TwitterHandle", "jadaradix");
    const rawDeepProfile = objectify.toRaw("DeepProfile", deepProfile);
    return rawDeepProfile;
  };

  it("makes a deep profile", function (done) {
    const deepProfile = makeDeepProfile();
    return done();
  });

  it("serialises a deep profile (toRaw)", function (done) {
    const rawDeepProfile = makeRawDeepProfile();
    expect(rawDeepProfile.fieldTwitterHandle).to.equal("jadaradix");
    return done();
  });

  it("deserialises a deep profile (fromRaw)", function (done) {
    const rawDeepProfile = makeRawDeepProfile();
    const deepProfile = objectify.fromRaw("DeepProfile", rawDeepProfile);
    expect(deepProfile.getField("TwitterHandle")).to.equal("jadaradix");
    return done();
  });

});