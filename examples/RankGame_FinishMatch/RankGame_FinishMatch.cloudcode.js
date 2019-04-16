var response = {};

var ownerId = data.ownerId;
var matchId = data.matchId;
var winnerId = data.winnerId;
var loserId = data.loserId;

var winnerRating = data.winnerRating;
var loserRating = data.loserRating;

var isTie = data.isTie;

var debug = [];


// We are going to mark the current match as complete.
var ownerSession = bridge.getSessionForProfile(ownerId);
var asyncMatchProxy = bridge.getAsyncMatchServiceProxy(ownerSession);
response = asyncMatchProxy.completeMatch(ownerId, matchId);


// Now, if it is not a tie, let process the remaining match results.
if (!isTie) {
    // Let get the session of both the winner and the loser.
    var winnerSession = bridge.getSessionForProfile(winnerId);
    var loserSession = bridge.getSessionForProfile(loserId);
    var winnerMatchMakingProxy = bridge.getMatchMakingServiceProxy(winnerSession);
    var loserMatchMakingProxy = bridge.getMatchMakingServiceProxy(loserSession);


    // We are going to increase the winners rating slightly, and slightly decrease it for the loser. 
    var winnerDelta = ((loserRating + 400) / winnerRating) * 40;
    var loserDelta = ((loserRating - 400) / winnerRating) * 40;

    // Rating defaults and matchmaking controls are on the brainCloud dashboard, under Design | Multiplayer | Matchmaking
    // Our TicTacToe example app uses 1200 as the default: https://github.com/getbraincloud/examples-unity/tree/master/TicTacToe

    winnerMatchMakingProxy.incrementPlayerRating(winnerDelta);
    loserMatchMakingProxy.decrementPlayerRating(loserDelta);


    // Let's Post Scores to Rating's Leaderboard. Leaderboard settings are on the brainCloud Dashboard under Design | Leaderboard | Leaderboard Configs
    var leaderboardId = "Player_Rating";

    var winnerRating = winnerDelta + winnerRating;
    var loserRating = loserRating - loserDelta;

    debug.push({ "winnerDelta": winnerDelta });
    debug.push({ "loserDelta": loserDelta });

    var winnerLeaderboardProxy = bridge.getLeaderboardServiceProxy(winnerSession);
    var loserLeaderboardProxy = bridge.getLeaderboardServiceProxy(loserSession);

    winnerLeaderboardProxy.postScoreToLeaderboard(leaderboardId, winnerRating, null);
    loserLeaderboardProxy.postScoreToLeaderboard(leaderboardId, loserRating, null);


    // And update the player stats. Stats settings are on the brainCloud Dashboard under Design | Statistics Rules | User Stats
    var playerStats = { "WON_RANKED_MATCH": 1 };
    var playerStatisticsProxy = bridge.getPlayerStatisticsServiceProxy(winnerSession);
    playerStatisticsProxy.incrementPlayerStats(playerStats);
}

var matchMakingProxy = bridge.getMatchMakingServiceProxy();
var response = matchMakingProxy.read();

// We are also attaching some debug logic onto the response
response.debug = debug;

response; //return the object.
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"RankGame_FinishMatch",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Ends a rank match. Adjust player's rating and stats if not a tie. Updates player's standings in a rating's leaderboard.\\n\\nownerId - Owner id of match played.\\nmatchId - Id of match played.\\nwinnerId - Id of winning player.\\nloserId - Id of losing player.\\nwinnerRating - Rating of winning player.\\nloserRating - Rating of losing player.\\nisTie - Whether the match state ended in a tie",
// "parms":"{\\n  \\"ownerId\\": \\"8f6b8fc3-cb19-4052-9bf6-ebf86a628536\\",\\n  \\"matchId\\": \\"a4b36631-a35c-4e2c-af8b-4c671c265b91\\",\\n  \\"winnerId\\": \\"8f6b8fc3-cb19-4052-9bf6-ebf86a628536\\",\\n  \\"loserId\\": \\"10627e1e-208f-4fb8-93a0-ca4ac014acef\\",\\n  \\"winnerRating\\": 1200,\\n  \\"loserRating\\": 1200,\\n  \\"isTie\\" : false\\n}",
// "version":12,
// "updatedAt":1536098452645