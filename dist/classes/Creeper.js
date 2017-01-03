"use strict";
var CreeperHandlesTweetedAt_1 = require("../classes/CreeperHandlesTweetedAt");
var CreeperFrequency_1 = require("../classes/CreeperFrequency");
var Creeper = (function () {
    function Creeper(creeperId, name, type, keywords, actions, isEnabled, isEnabledByUs, frequency, delay, handlesTweetedAt, converterId) {
        var _this = this;
        if (actions === void 0) { actions = []; }
        if (isEnabled === void 0) { isEnabled = false; }
        if (isEnabledByUs === void 0) { isEnabledByUs = true; }
        if (frequency === void 0) { frequency = new CreeperFrequency_1["default"](30); }
        if (delay === void 0) { delay = 5 * 60; }
        if (handlesTweetedAt === void 0) { handlesTweetedAt = new CreeperHandlesTweetedAt_1["default"](); }
        if (converterId === void 0) { converterId = null; }
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
        // tweet
        return true;
    };
    Creeper.prototype.tweeted = function (tweet) {
        this.handlesTweetedAt.add(tweet.user.screen_name);
        return this;
    };
    Creeper.prototype.enable = function () {
        this.isEnabled = true;
        return this;
    };
    Creeper.prototype.disable = function () {
        this.isEnabled = false;
        return this;
    };
    return Creeper;
}());
exports.__esModule = true;
exports["default"] = Creeper;
