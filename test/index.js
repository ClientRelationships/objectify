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
    return done(typeof object === type);
  });

  it("converts an object into a raw object", function (done) {
    let newRawObject = objectify.toRaw(type, object);
    expect(newRawObject).to.deep.equal(rawObject);
    return done();
  });

  it("makes an object", function (done) {
    let newObject = objectify.factory(type).make(rawObject.name, rawObject.age);
    return done(typeof newObject === type);
  });

});