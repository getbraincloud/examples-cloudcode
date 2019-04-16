# RestrictClientCalls
## Purpose
Allows an app to restrict access to brainCloud Client APIs. Very useful if your app has important security requirements.

The script can be configured in one of two ways:

* whitelist – all services and operations specified are *allowed*. Any API calls not specified are not allowed.
* blacklist – disallow access to the services and operations specified. All other API calls are permitted.

## Script
Click [RestrictClientCalls.cloudcode.js](RestrictClientCalls.cloudcode.js) to download the file.

## Usage / Setup
To configure this script, you must first import it into your app.

Then go to the [**Design | Cloud Code | API Hooks**](https://portal.braincloudservers.com/admin/dashboard?custom=null#/development/serverscripts-pre-post-script) screen, and click the **[+ Create]** button to configure the script.

On the configuration dialog that displays, choose:

* Service: “Dispatcher”
* Operation: “ProcessMessage”
* Pre/Post: “Pre”
* Script: “RestrictClientCalls”
And then in the *Params* section, you can configure a whitelist or blacklist of services and operations to enable or restrict. Here is an example:
```json
{
    "listtype": "whitelist",
    "services": {
        "entity": { "READ": 1 },
        "globalEntity": { "GET_LIST": 1, "GET_LIST_COUNT": 1 },
        "playerState": {},
        "script": {}
    }
}
```
The example above allows calls to:

* “entity” service, “READ” operation only
* “globalEntitity” service, “GET_LIST” and “GET_LIST_COUNT” operations
* “playerState” service – any operation
* “script” service – any operation… <- note, individual script permissions still apply
## Notes
Calls to the “authenticationV2” service are always allowed.
Rejected API calls will return an HTTP status of 500 with a 40639 reason_code.