var response = {};

var requestingProfileId = data.requestingProfileId;

var currentGroup = data.currentGroup;
var rivalGroup = data.rivalGroup;

var requestingMemberSession = bridge.getSessionForProfile(requestingProfileId);
var groupProxy = bridge.getGroupServiceProxy(requestingMemberSession);

groupProxy.leaveGroup(currentGroup);

groupProxy.joinGroup(currentGroup);
groupProxy.joinGroup(rivalGroup);

response = groupProxy.getMyGroups();

response;
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"Test_UniqueGroups_AcceptGroupMember",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Script that setups for test data for UniqueGroups_AcceptGroupMember\\nrequestingProfileId - profileId of the user requesting to join the group\\ncurrentGroup - the groupId of the group that is currently accepting the joinRequest \\nrivalGroup - a groupId of a rival group that also has a join request from the requesting user. This group is manually created by the tester",
// "parms":"{\\n    \\"requestingProfileId\\" : \\"808e7a08-d5b2-4524-964e-9af80d6a6c41\\",\\n    \\"currentGroup\\" : \\"be195271-657e-4372-a107-23679047e7b6\\",\\n    \\"rivalGroup\\" : \\"cc448c05-42d6-461a-9144-7e6a299be553\\"\\n}",
// "version":8,
// "updatedAt":1535480333959