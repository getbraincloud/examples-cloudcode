var response = {};

response.posted = 0;
response.errors = 0;
response.errorsList = [];

// Let's grab the parameters passed into the script.
var leaderboards = data.leaderboards;
var score = data.score;
var extras = data.extras;

var _leaderboard = bridge.getLeaderboardServiceProxy();
var postResult = {};

// Now, loop through the leaderboards.
for (var i = 0; i < leaderboards.length; i++) {

    // And post the new score.
    postResult = _leaderboard.postScoreToLeaderboard(leaderboards[i], score, extras);
    if (postResult.status == 200) {
        response.posted++;
    } else {
        // We are going to track any errors for the response.
        response.errors++;
        response.errorsList.push(postResult);
    }

}


response; // Return the results




//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"PostToLeaderboards",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":10,
// "description":"Posts a score to multiple leaderboards\\n\\nleaderboards - Ids of leaderboards to post to\\nscore - new score being posted\\nextra - extra data attached on leaderboard entry",
// "parms":"{\\n  \\"leaderboards\\": [\\"regular\\", \\"alltime\\"],\\n  \\"score\\": 1000,\\n  \\"extras\\": {}\\n}",
// "version":4,
// "updatedAt":1536165762800