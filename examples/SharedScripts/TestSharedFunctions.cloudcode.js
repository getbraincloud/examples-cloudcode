var response = {};

// First Load the shared scripts into a string object
var sharedScripts = String(bridge.getGlobalProperty("sharedScripts"));

// Output to the log - helps for debugging. Debug log is only written to when run from API explorer or CC editor
bridge.logDebug("Loading shared code...", sharedScripts);

// And now evaluate the functions so that they become part of the script.
// Any errors in the code being evaluated will be reported as errors as if they
// occurred in the script itself. This affects the line numbers the error is reported upon.
eval(sharedScripts);

// Now you can use any of the functions included...
response.getFuzz = getFuzz();
response.sum = addTwoNums( 5, 10 );

response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"TestSharedFunctions",
// "clientCallable":true,
// "s2sCallable":true,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"This script tests using a global property for shared javascript functions...",
// "parms":"{\\n}",
// "version":3,
// "updatedAt":1559322657708