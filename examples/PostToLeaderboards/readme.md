# PostToLeaderboards
## Purpose
This script allows you to post to multiple leaderboards efficiently.

## Script
Click [PostToLeaderboards.cloudcode.js](PostToLeaderboards.cloudcode.js) to download the file.

## Usage / Setup
To configure this script, simply import it into your app.

Then call it from your app via the [RunScript()](https://getbraincloud.com/apidocs/apiref/index.html#capi-script-runscript) API call.

The script takes the following parameters:

* leaderboards – Ids of leaderboards to post to.
* score – new score being posted.
* extra – extra data attached on leaderboard entry.

```json
// Example Parameters
{
   "leaderboards": ["regular", "alltime"],
   "score": 1000,
   "extras": {}
}
```