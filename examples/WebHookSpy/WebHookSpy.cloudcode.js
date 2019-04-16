// This script logs and returns whatever is sent to it
// Useful for initially testing what is being sent to your webhook

// Some services (like Facebook!) send parameters with periods in them.
// MongoDB doesn't like those - so we need to substitute "_" for the periods
// before logging them to the global entity.
function safeMap(aMap) {
    var newMap = {};
    var newKey = "";

    for (var key in aMap) {
        newKey = key.replace(/\./g, "_");
        newMap[newKey] = aMap[key];
    }

    return newMap;

}

// Main script...

var response = {};

// Clone the request parameters
var webHookParms = JSON.parse(JSON.stringify(data));

// Make the arguments and parameters mongoDB-safe
webHookParms.headers = safeMap(data.headers);
webHookParms.parameters = safeMap(data.parameters);

// Log the safe version of the parameters received
var logService = bridge.getLogServiceProxy();
logService.logInfo("Webhook [ " + webHookParms.requestUrl + " ] - dumping parameters...", JSON.stringify(webHookParms));

// Construct a response
response.jsonResponse = {};
response.message = "Webhook received";
response.jsonResponse.receivedInCCdata = data;

response;


//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"WebHookSpy",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":60,
// "description":"Logs and returns the data sent to a webhook...",
// "parms":"{\\n  \\"headers\\": {\\n    \\"header1\\": \\"hello\\"\\n  },\\n  \\"stringBody\\": \\"value2\\",\\n  \\"jsonBody\\": {\\n    \\"aKey\\": \\"aValue\\"\\n  },\\n  \\"pathBalance\\": \\"aPath\\",\\n  \\"parameters\\": {\\n    \\"parm1\\": 1\\n  },\\n  \\"requestUrl\\": \\"url\\"\\n}",
// "version":2,
// "updatedAt":1535641210755