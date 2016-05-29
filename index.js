/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Beer Lover for a beer fact"
 *  Alexa: "Here's your beer fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.e22256b3-2fe6-45e2-a84b-037e4edfdf4c";

/**
 * Array containing BEER facts.
 */
var BEER_FACTS = [
    "You can't be a real country unless you have a beer and an airline. It helps if you have some kind of a football team, or some nuclear weapons, but at the very least you need a beer. Frank Zappa.",
    "Let a man walk ten miles steadily on a hot summer's day along a dusty English road, and he will soon discover why beer was invented. Gilbert Chesterton.",
    "I've only been in love with a beer bottle and a mirror. Sid Vicious.",
    "They who drink beer will think beer. Washington Irving.",
    "I'm gaining weight the right way: I'm drinking beer. Johnny Damon.",
    "The basic thing a man should know is how to change a tire and how to drive a tractor. Whatever that bearded dude is doing on the Dos Equis beer commercials sets the bar. That's your guy. Every man should be aiming to be like him. The beard is just the tip of the iceberg. Timothy Olyphant.",
    "Give a man a beer, waste an hour. Teach a man to brew, and waste a lifetime! Bill Owen.",
    "Beer, it's the best damn drink in the world. Jack Nicholson.",
    "He was a wise man who invented beer. Plato.",
    "Beauty is in the eye of the beer holder. Kinky Friedman.",
    "Milk is for babies. When you grow up you have to drink beer. Arnold Schwarzenegger.",
    "TYes, sir. I'm a real Southern boy. I got a red neck, white socks, and Blue Ribbon beer. Billy Carter.",
    "There's something sexy about a gut. Not a 400-pound beer gut, but a little paunch. I love that. Sandra Bullock.",
    "Not all chemicals are bad. Without chemicals such as hydrogen and oxygen, for example, there would be no way to make water, a vital ingredient in beer. Dave Barry.",
    "The head sticking to the side of your pint glass? That is referred to as lacing and is a sign of a clean glass and a good brew.",
    "Your tongue has about 10,000 taste buds, so put them to good work and try out a new beer!",
    "Not all waters are created equal: the origin and treatment of water have an impact on the finished beer, at both the molecular and sensory levels.",
    "At the present time, all-malt beers are predominantly brewed with two-row barley, which yields plumper kernels and grows well in cooler climates.",
    "Kilning is the source of nearly all malt flavours in beer.",
    "Hops must be boiled vigourously to extract their bitterness.",
    "Yeast is remarkably sensitive to temperature and can create completely different beers with only a small temperature variation in the brewing process.",
    "To achieve the ultimate draft pint, pour the beer directly into the bottom of a perfectly clean glass. Continue to pour, letting the foam rise and settle until the glass is full, effectively creating a dense and long lasting head on the pint.",
    "When pairing food and beer, be aware that a hoppy bitter flavour emphasizes spicy dishes."
];
/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BeerQuotes is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BeerQuotes = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BeerQuotes.prototype = Object.create(AlexaSkill.prototype);
BeerQuotes.prototype.constructor = BeerQuotes;

BeerQuotes.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BeerQuotes onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BeerQuotes.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BeerQuotes onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BeerQuotes.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BeerQuotes onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BeerQuotes.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Beer Lover tell me about beer, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random BEER fact from the BEER facts list
    var factIndex = Math.floor(Math.random() * BEER_FACTS.length);
    var fact = BEER_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Beer fact: " + fact;

    response.tellWithCard(speechOutput, "BeerFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BeerFacts skill.
    var beerquotes = new BeerQuotes();
    beerquotes.execute(event, context);
};
