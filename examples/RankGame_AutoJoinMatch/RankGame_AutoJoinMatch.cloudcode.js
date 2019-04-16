const NO_MATCHES_FOUND_MESSAGE = "No matches found. You will be entered into a match with the next player looking for one.";
const MATCH_STATE = "MATCH_STATE";
const LOOKING_FOR_MATCH = "LOOKING_FOR_MATCH";
const FOUND_MATCH = "FOUND_MATCH";


var response = {};


var pushNotificationMessage = data.pushNotificationMessage;

// We are going to look for one player that is also looking for a match. And who is within a given range rating, compared to the current player.
var numberOfResults = 1;
var jsonAttributes = { MATCH_STATE : LOOKING_FOR_MATCH };
var rankRangeDelta = data.rankRangeDelta;

var matchMakingProxy = bridge.getMatchMakingServiceProxy();
response = matchMakingProxy.findPlayersWithAttributes(
    rankRangeDelta,
    numberOfResults,
    jsonAttributes);

// If we haven't found a player looking for a match
if(response.data.matchesFound.length === 0) {
    response = NO_MATCHES_FOUND_MESSAGE;

    //  We are going to flag the current player as look for a match, so the next player to make this script call will auto-match with this current player
    var attributesToUpdate = { MATCH_STATE : LOOKING_FOR_MATCH };
    var playerStateProxy = bridge.getPlayerStateServiceProxy();
    playerStateProxy.updateAttributes(attributesToUpdate, false);

}
// Else, if we have found a player looking for a match.
else {
	// We are going to flag that player as no longer looking for a match.
	var matchedPlayerId = response.data.matchesFound[0].playerId;
    var matchedSession = bridge.getSessionForProfile(matchedPlayerId);
    var matchedPlayerStateProxy = bridge.getPlayerStateServiceProxy(matchedSession);
    var attributesToUpdate = { MATCH_STATE : FOUND_MATCH };
    matchedPlayerStateProxy.updateAttributes(attributesToUpdate, false);

	// Then we are going to setup the details for the match.
    var currentProfileId = bridge.getProfileId();
    var players = [ { "platform": "BC", "id": matchedPlayerId } ];

    var asyncMatchProxy = bridge.getAsyncMatchServiceProxy();

    // When using this cloud code script, we are always going to let the current session go first.
    var yourTurnFirst = true;
    var nextPlayer = yourTurnFirst ? currentProfileId : matchedPlayerId;

	// And we are going to setup up our game's logic. Our example is a TicTacToe game: https://github.com/getbraincloud/examples-unity/tree/master/TicTacToe
    var jsonSummary = {
        "players" : [
            { "profileId" : currentProfileId, "token" : yourTurnFirst ? "X" : "O" },
            { "profileId" : matchedPlayerId, "token" : yourTurnFirst ? "O" : "X" }
        ]
    }
    var jsonMatchState = { "board" : "#########" };

	//  Finally, we make the createMatchWithInitialTurn call to create the match.
    response = asyncMatchProxy.createMatchWithInitialTurn(players, jsonMatchState, pushNotificationMessage, nextPlayer, jsonSummary);
}

response; //return the object.
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"RankGame_AutoJoinMatch",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Starts a ranked match with a player looking for a match. Otherwise, will indicate that the current player is looking for a ranked match.\\n\\nrankRangeDelta - Elo range delta we will accept. A player will 1200 Elo and a delta of 200, will accept matches of players between 1000-1400\\npushNotificationMessage - Notification opposing player will see. Note: you must first set your app up with push notifications",
// "parms":"{\\n  \\"rankRangeDelta\\": 200,\\n  \\"pushNotificationMessage\\" : \\"You are now in a ranked match!\\"\\n}",
// "version":18,
// "updatedAt":1536173608424
