var response = {};
var CoreScript = "AWSGameLiftCore";
var FleetID = ""; // Either write here or use data object.
var MAXIMUM_PLAYER_SESSION_COUNT = 1 // Just a convention, you don't have to create this variable.

// Proxy Scripting
var scriptProxy = bridge.getScriptServiceProxy();

// Important part is here...
var jsonScriptData = {
  region: "us-east-1", // Feel free to change this value to whatever region you need.
  action: 'CreateGameSession',
  payload: {
    FleetId: FleetID,
    MaximumPlayerSessionCount: MAXIMUM_PLAYER_SESSION_COUNT
  }
};
// Just to debug...
bridge.logDebug("Running the **GL_CreateGameSession** script...", null);

var postResult = scriptProxy.runScript(CoreScript, jsonScriptData);

response.result = postResult.data.response; // Now you can get it.

response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"GL_CreateGameSession",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"",
// "parms":"{\\n}",
// "version":17,
// "updatedAt":1555346294382