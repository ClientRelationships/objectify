"use strict";
var CreeperLocation_1 = require("../classes/CreeperLocation");
var CreeperHandlesTweetedAt_1 = require("../classes/CreeperHandlesTweetedAt");
var CreeperFrequency_1 = require("../classes/CreeperFrequency");
var Creeper = (function () {
    function Creeper(creeperId, name, type, keywords, actions, state, isEnabledByUs, frequency, delay, handlesTweetedAt, converterId, deepProfileOnFind, deepProfileOnAction, geofilter) {
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
        if (geofilter === void 0) { geofilter = new CreeperLocation_1["default"](); }
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
        console.log("----------------");
        console.log(tweet);
        console.log("----------------");
        var tweetText = tweet.text.toLowerCase();
        var elements = tweetText.split(" ");
        // don't reply to a tweet which is nothing to do with the keywords at all
        var keywordsWithinTheTweet = this.keywords.map(function (keyword) { return keyword.toLowerCase(); }).filter(function (keyword) { return tweetText.indexOf(keyword) !== -1; });
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
            if (!tweet.user.location) {
                // user doesn't specify a location, so can't be sure - don't tweet
                console.log("canTweet decision", "don't tweet if geofilter is specified and this doesn't work out -> user doesn't specify a location, so can't be sure - don't tweet");
                return false;
            }
            else {
                // user specifies a location, check
                var matchingLocations = this.geofilter.filter(function (location) {
                    return tweet.user.location.toLowerCase().indexOf(location.toLowerCase()) !== -1;
                });
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
        var elementsLinks = elements.filter(function (element) { return element.indexOf("http:") === 0 || element.indexOf("https:") === 0; });
        var elementsHashtags = elements.filter(function (element) { return element[0] === "#"; });
        var elementsMentions = elements.filter(function (element) { return element[0] === "@"; });
        if (elements.length === elementsLinks.length + elementsHashtags.length + elementsMentions.length) {
            console.log("canTweet decision", "don't tweet at an obviously spammy tweet");
            return false;
        }
        // don't reply to a tweet where any keyword is part of another word
        // this code is "self documenting"...
        var keywordIssue = false;
        this.keywords.forEach(function (keyword) {
            if (tweetText.indexOf(keyword.toLowerCase()) !== -1) {
                // woohoo, this keyword was mentioned!
                var regex = new RegExp(keyword, "gi"), result = void 0, indices = [];
                while ((result = regex.exec(tweetText))) {
                    indices.push(result.index);
                }
                var allowedWrappingCharacters_1 = [" ", "\"", "'", "!", "?", ".", ",", ";", "(", ")", "/"];
                var indicesWithASpaceBeforeOrAfter = indices.filter(function (index) {
                    if (index === 0) {
                        // first: needs a space after it
                        return (allowedWrappingCharacters_1.indexOf(tweetText[index + keyword.length]) !== -1);
                    }
                    else if (index === tweetText.length - keyword.length) {
                        // last: needs a space before it
                        return (allowedWrappingCharacters_1.indexOf(tweetText[index - 1]) !== -1);
                    }
                    else {
                        // middle: needs a space before it AND after it
                        return (allowedWrappingCharacters_1.indexOf(tweetText[index - 1]) !== -1 && allowedWrappingCharacters_1.indexOf(tweetText[index + keyword.length]) !== -1);
                    }
                });
                if (indicesWithASpaceBeforeOrAfter.length === 0)
                    keywordIssue = true;
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
    };
    Creeper.prototype.tweeted = function (tweet) {
        this.handlesTweetedAt.add(tweet.user.screen_name);
        return this;
    };
    Creeper.prototype.enable = function () {
        this.state = "enabled";
        return this;
    };
    Creeper.prototype.disable = function () {
        this.state = "disabled";
        return this;
    };
    Creeper.prototype.setGeo = function (geofilter) {
        this.geofilter = geofilter;
        return this;
    };
    return Creeper;
}());
exports.__esModule = true;
exports["default"] = Creeper;
