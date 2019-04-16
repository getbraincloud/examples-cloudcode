// This cloud code script isn't called from the client.
// Instead, it needs to be added as a post API Hook on Authenticate.


// From that authenticate call, let's get the isForceCreate and isNewUser.
// For registering a new user, we expect forceCreate to be true, and newUser to be false.
isForceCreate = String(data.callingMessage.forceCreate) == "true";
isNewUser = String(data.message.newUser) == "true";

var response = {};
response.status = 200;
response.data = data.message;

// When we are attempting to register a new user, if the user already exists, let's throw an error.
if (isForceCreate && !isNewUser) {
    response.data = {};
    response.data.error = "This user is already registered, please login."

    // And we invalidate the current session, given we want the user to use the proper login screen.
    bridge.invalidateSession();
}
// Else, if this *is* a new user being made.
else if (isForceCreate && isNewUser) {
    // Let's handle any needed registration logic here, such as setting up a default player name, like Rookie.
    var defaultPlayerName = "Rookie"

    var playerStateProxy = bridge.getPlayerStateServiceProxy();
    // We are changing the player name on the server.
    playerStateProxy.updatePlayerName(defaultPlayerName);
    // And in this API Call's return data.
    response.data.playerName = defaultPlayerName;


    // You could also give the new user some starting currency for registering, or set up some default user entities.

    //TODO: Add your onFirstUserSignup logic here!


}


response; //return the object


//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"OnRegisterNewUser",
// "clientCallable":false,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Registers a new user, and handles any first user registration setup.\\nWill throw an error on an already existing user.\\n\\nBe sure to set this script as a Post API Hook on Authenticate, so it can occur whenever an authenticate is called.",
// "parms":"{\\n}",
// "version":17,
// "updatedAt":1535484673661