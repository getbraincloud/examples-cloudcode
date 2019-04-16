var response = false;

// Only enforce if this call is not from *within* a cloud-code script.
if (!data.message.ccCall) {

    var listtype = data.parms.listtype;
    var services = data.parms.services;

    // Default response differs by type of list.
    if (listtype == "whitelist") {
        response = false;
    } else {
        response = true;
    }

    // Look to see if the service.
    if (services.hasOwnProperty(data.service)) {

        var ops = services[data.service];

        if (Object.keys(ops).length > 0) {

            if (ops.hasOwnProperty(data.operation)) {
                response = (listtype == "whitelist");
            }

        } else {
            // If no ops, that means all...
            response = (listtype == "whitelist");
        }
    }
} else {
    response = true;
}

response;


//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"RestrictClientCalls",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":10,
// "description":"Attach as an prehook to the global Dispatcher service to restrict the API calls that can be made from the client. Can function as a whitelist or blacklist. Can list as many operations as you would like per service listing none is the same as specifying all of them.",
// "parms":"{\\n    \\\"service\\\": \\\"entity\\\",\\n    \\\"operation\\\": \\\"GET_LIST\\\",\\n    \\\"message\\\": {\\\"entityType\\\": \\\"address\\\"},\\n    \\\"parms\\\": {\\n        \\\"listtype\\\": \\\"whitelist\\\",\\n        \\\"services\\\": {\\n            \\\"entity\\\": { \\\"READ\\\": 1 },\\n            \\\"globalEntity\\\": { \\\"GET_LIST\\\": 1 },\\n            \\\"playerState\\\": {},\\n            \\\"script\\\": {}\\n        }\\n    }\\n}",
// "version":4,
// "updatedAt":1547475089955