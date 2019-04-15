var response = {};
var CoreScript = "AWSGameLiftCore";
var FleetID = ""; // Either Write here or use data object
// Proxy Scripting
var scriptProxy = bridge.getScriptServiceProxy();

// Important Part Is here...
var jsonScriptData = {
    region: "us-east-1", // feel free to change this value to whatever region you need
    action: 'SearchGameSessions',
    payload: {
      FleetId: FleetID
    }
};
// Just to Debug...
bridge.logDebug("Running the **GL_CreateGameSession** script...", null);

var postResult = scriptProxy.runScript(CoreScript, jsonScriptData);

response.result = postResult.data.response; // Now You Can Get It

response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"GL_SearchGameSessions",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"",
// "parms":"{\\n  \\\"parm1\\\": \\\"value1\\\",\\n  \\\"parm2\\\": \\\"value2\\\"\\n}",
// "version":4,
// "updatedAt":1555347985324