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

    let creeper = objectify.factory("Creeper").make("Test Autochirp", "Autochirp", ["keyword 1", "keyword 2", "keyword 3"]);
    let creeperAction = objectify.factory("CreeperAction").make("Reply");
    let creeperFrequencies = objectify.factory("CreeperFrequencies").make();

    it("makes a creeper", function (done) {
      expect(creeper.frequency.toString()).to.equal("Normal (30/60)");
      expect(creeper.type.toString()).to.equal("Autochirp");
      expect(creeper.delay).to.equal(300);
      return done();
    });

    it("serialises a creeper", function (done) {
      let rawObject = objectify.toRaw("Creeper", creeper);
      expect(rawObject.actionFrequency).to.equal(30);
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