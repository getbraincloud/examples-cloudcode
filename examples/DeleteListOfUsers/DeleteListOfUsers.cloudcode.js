var response = {};

response.deletedUsers = 0;

response.doesNotExist = [];
response.failedToDelete = [];

// Let's delete all profile id's given
if (data.profileIds !== undefined) {
	for (var i = 0; i < data.profileIds.length; i++) {
		var profileId = data.profileIds[i];

		var session;

		try {
			session = bridge.getSessionForProfile(profileId);
		} catch (e) {
			response.doesNotExist.push(profileId);
			continue;
		}

		var playerStateProxy = bridge.getPlayerStateServiceProxy(session);

		var postResult = playerStateProxy.deleteUser();

		if (postResult.status == 200) {
			response.deletedUsers++;
		} else {
			response.failedToDelete.push(profileId);
		}
	}
}

// Let's delete all universal id's listed
if (!data.universalIds !== undefined) {
	for (var i = 0; i < data.universalIds.length; i++) {
		var universalId = data.universalIds[i];

		var session;

		try {
			session = bridge.getSessionForCredential(universalId, 'Universal');
		} catch (e) {
			response.doesNotExist.push(universalId);
			continue;
		}

		var playerStateProxy = bridge.getPlayerStateServiceProxy(session);

		var postResult = playerStateProxy.deleteUser();
		if (postResult.status == 200) {
			response.deletedUsers++;
		} else {
			response.failedToDelete.push(profileId);
		}
	}
}

response; // Return the results
//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"DeleteListOfUsers",
// "clientCallable":false,
// "s2sCallable":true,
// "peerCallable":false,
// "scriptTimeout":20,
// "description":"Deletes a list of users, based on the provided list of profile ids and universal ids.",
// "parms":"{\\n  \\\"profileIds\\\": [\\\"the-profileid\\\", \\\"a8d86270-c95b-4ea7-a545-46bf27e7f94e\\\"],\\n  \\\"universalIds\\\": [\\\"the-universal-id\\\",\\\"tester_12\\\",\\\"admin_42\\\"]\\n}",
// "version":31,
// "updatedAt":1568304459979
