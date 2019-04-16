// Begin Debug Setup
var showDebugInfo = false;
var runDebugScript = false;

if (runDebugScript) {
    var scriptName = "Test_UniqueGroups_AcceptGroupMember";
    var scriptData = {
        "requestingProfileId": data.profileId,
        "currentGroup": data.groupId,
        "rivalGroup": "cc448c05-42d6-461a-9144-7e6a299be553"
    };

    // Let's run a debug script that will set this script up in a testable state.
    var scriptProxy = bridge.getScriptServiceProxy();
    scriptProxy.runScript(scriptName, scriptData);
}
// End Debug Setup



// From the script call, let's get the profileId of the user we are adding to the group and the group id of that group.
profileId = data.profileId;
groupId = data.groupId;

var response = {};


// Get the session of the requesting new group member, and get their current groups.
var requestingMemberSession = bridge.getSessionForProfile(profileId);
var groupProxy = bridge.getGroupServiceProxy(requestingMemberSession);
var myGroups = groupProxy.getMyGroups();

// If this requesting new group member *is* already in a group, we are going to throw an error.
if (myGroups.data.groups.length > 0) {
    // Given, we don't want a user to be in mulitple groups.
    response.data = { "status": 400, "message": "User is already in group " + myGroups.data.groups[0].name + "." }

}
// Else, if they are not in a group, we are going to accept this user.
else {

    var role = "MEMBER";
    var attributes = { "Rank": "Rookie" };


    var groupProxy = bridge.getGroupServiceProxy();
    // Request Approved!
    var approvedRequest = groupProxy.approveGroupJoinRequest(groupId, profileId, role, attributes);

    // Let's tack on some extra logic for debugging, to return later in the response. 
    var debugObject = {};
    debugObject.approvedRequest = approvedRequest;
    debugObject.rejectedRequests = [];


    // Now, for each remaining requested group join request from that new group member.
    for (i = 0; i < myGroups.data.requested.length; i++) {

        var group = myGroups.data.requested[i];

        // That was not the current group request.
        if (group.groupId != groupId) {
            // Let's get the ownerId and groupId.
            var requestedOwnerId = group.ownerId;
            var requestedGroupId = group.groupId;

            // And reject the remaining requests with the requested group owner session.
            var requestedOwnerSession = bridge.getSessionForProfile(requestedOwnerId);
            var groupProxy = bridge.getGroupServiceProxy(requestedOwnerSession);
            var rejectedRequest = groupProxy.rejectGroupJoinRequest(requestedGroupId, profileId);

            rejectedRequest.requestedOwnerId = requestedOwnerId;
            rejectedRequest.requestedGroupId = requestedGroupId;

            debugObject.rejectedRequests.push(rejectedRequest);
        }
    }

    // Let's now set the success response.
    response.data = {
        "status": 200,
        "message": "User has joined your group!"
    }

    // And attach that debug information.
    if (showDebugInfo) {
        response.data.debug = debugObject;
    }
}


response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"UniqueGroups_AcceptGroupMember",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Accept a new member into your group. The method will ensure they are currently not in a group before accepting them, and it will cancel all of their group join requests.\\n\\nprofileId - profileId of the (potential) new member requesting to join the group\\ngroupId - groupId of the group that the (potential) new member is requesting to join",
// "parms":"{\\n    \\"profileId\\" : \\"808e7a08-d5b2-4524-964e-9af80d6a6c41\\",\\n    \\"groupId\\" : \\"be195271-657e-4372-a107-23679047e7b6\\"\\n}",
// "version":95,
// "updatedAt":1535481536259