"use strict";
var CreeperHandlesTweetedAt_1 = require("../classes/CreeperHandlesTweetedAt");
var CreeperFrequency_1 = require("../classes/CreeperFrequency");
var Creeper = (function () {
    function Creeper(creeperId, name, type, keywords, actions, state, isEnabledByUs, frequency, delay, handlesTweetedAt, converterId, deepProfileOnFind, deepProfileOnAction, geo) {
        var _this = this;
        if (actions === void 0) { actions = []; }
        if (state === void 0) { state = "disabled"; }
        if (isEnabledByUs === void 0) { isEnabledByUs = false; }
        if (frequency === void 0) { frequency = new CreeperFrequency_1["default"](30); }
        if (delay === void 0) { delay = 5 * 60; }
        if (handlesTweetedAt === void 0) { handlesTweetedAt = new CreeperHandlesTweetedAt_1["default"](); }
        if (converterId === void 0) { converterId = null; }
        if (deepProfileOnFind === void 0) { deepProfileOnFind = false; }
        if (deepProfileOnAction === void 0) { deepProfileOnAction = false; }
        if (geo === void 0) { geo = ""; }
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
        this.geo = geo;
        if (actions) {
            this.actions = actions;
            this.actionsCountStore = {};
            this.actions.map(function (action) { return action.type.toString(); }).forEach(function (actionTypeString) {
                _this.actionsCountStore["unique-action-current-" + actionTypeString] = Math.floor(Math.random() * _this.actions.length);
            });
        }
    }
    Creeper.prototype.setClient = function (client) {
        this.client = client;
        return this;
    };
    Creeper.prototype.setConverter = function (converter) {
        this.converter = converter;
        return this;
    };
    Creeper.prototype.toString = function () {
        return this.name + " (" + this.keywords + ")";
    };
    Creeper.prototype.bumpAction = function (type) {
        if (this.actionsCountStore["unique-action-current-" + type] === this.actions.length - 1) {
            console.log(" -> lastActionCount in creeperBumpAction is at upper bound; changing...");
            return (this.actionsCountStore["unique-action-current-" + type] = 0);
        }
        else {
            console.log(" -> lastActionCount in creeperBumpAction is NOT at upper bound; incrementing...");
            return (this.actionsCountStore["unique-action-current-" + type] += 1);
        }
    };
    ;
    Creeper.prototype.canTweet = function (tweet, currentSeconds) {
        // don't annoy people (already tweeted at them)
        if (this.handlesTweetedAt.contains(tweet.user.screen_name))
            return false;
        // don't barge into conversations
        if (tweet.text.indexOf("@") === 0)
            return false;
        // don't screw with retweets (RT syntax)
        if (tweet.text.indexOf("RT ") === 0)
            return false;
        // don't screw with retweets (object property)
        if (tweet.retweeted_status !== undefined)
            return false;
        // don't spam (tweet too often)
        if (currentSeconds >= this.frequency.value)
            return false;
        // don't tweet at yourself
        if (tweet.user.screen_name.toLowerCase() === this.client.twitter.toLowerCase())
            return false;
        // if geo is specified and user location is specified and they are similar
        if (this.geo.length > 0 &&
            tweet.user.location !== null &&
            this.geo.toLowerCase() !== tweet.user.location.toLowerCase()) {
            return false;
        }
        // tweet
        return true;
    };
    Creeper.prototype.tweeted = function (tweet) {
        this.handlesTweetedAt.add(tweet.user.screen_name);
        return this;
    };
    Creeper.prototype.enable = function () {
        this.state = "enabled";
        return this;
        f;
    };
    Creeper.prototype.disable = function () {
        this.state = "disabled";
        return this;
    };
    Creeper.prototype.setGeo = function (geo) {
        this.geo = geo;
        return this;
    };
    return Creeper;
}());
exports.__esModule = true;
exports["default"] = Creeper;
