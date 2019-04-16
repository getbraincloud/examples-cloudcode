// This cloud code script isn't called from the client.
// Instead, it needs to be added as a post API Hook on Authenticate.

var response = {};

// By default, we allow the authenticate (and return the original response)
response.status = 200;
response.data = data.message;

// However, now let's check to see if this user is banned.
var playerStateProxy = bridge.getPlayerStateServiceProxy();
var attr = playerStateProxy.getAttributes();

// This user was banned.
if (attr.data.attributes.banned === "true") {

    // So we will disallow the login.
    bridge.invalidateSession();

    // And we replace the return message with one that shows the banned response.
    message = {};
    message.banned = true;
    response.data = message;
    if (attr.data.attributes.ban_reason) {
        message.ban_reason = attr.data.attributes.ban_reason;
    }

}

response; //return the object


//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"BlockIfBanned",
// "clientCallable":false,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Blocks login (authentication) of the user if they have been flagged as banned.\\n\\nBe sure to set this script as a Post API Hook on Authenticate, so it can occur whenever an authenticate is called.",
// "parms":"{\\n}",
// "version":15,
// "updatedAt":1535488961736