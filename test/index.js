"use strict";

const chai = require("chai");
const should = chai.should();
const expect = chai.expect;

const objectify = require("../dist");

return describe("Objectify", function () {


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


  describe("creepers", function () {

    const clientId = 1024;
    let creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"], undefined, false);
    creeper.setClientId(clientId);
    let rawCreeper;
    const creeperAction = objectify.factory("CreeperAction").make("Reply");
    const creeperFrequencies = objectify.factory("CreeperFrequencies").make();

    it("makes a creeper", function (done) {
      expect(creeper.type.toString()).to.equal("Autochirp");
      expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
      expect(creeper.delay).to.equal(300);
      expect(creeper.isEnabled).to.equal(false);
      expect(creeper.clientId).to.equal(clientId);
      return done();
    });

    it("serialises a creeper (toRaw)", function (done) {
      rawCreeper = objectify.toRaw("Creeper", creeper);
      expect(rawCreeper.type).to.equal(2);
      expect(rawCreeper.actionFrequency).to.equal(30);
      expect(rawCreeper.delay).to.equal(300);
      expect(rawCreeper.isEnabled).to.equal(0);
      return done();
    });

    it("deserialises a creeper (toRaw)", function (done) {
      let newCreeper = objectify.fromRaw("Creeper", rawCreeper);
      expect(newCreeper.type.toString()).to.equal("Autochirp");
      expect(newCreeper.frequency.toString()).to.equal("Normal (30/60)");
      expect(newCreeper.delay).to.equal(300);
      expect(newCreeper.isEnabled).to.equal(false);
      return done();
    });

    it("makes a creeper action", function (done) {
      expect(creeperAction.type.toString()).to.equal("Reply");
      return done();
    });

    it("serialises a creeper action", function (done) {
      let rawObject = objectify.toRaw("CreeperAction", creeperAction);
      expect(rawObject.data).to.equal("Hello, World.");
      return done();
    });

    it("makes creeper frequencies", function (done) {
      expect(creeperFrequencies).length.to.be.at.least(0);
      return done();
    });

  });


});