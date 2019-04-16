# PostToLeaderboards
## Purpose
This script allows you to efficiently post to multiple leaderboards.

## Script
Click PostToLeaderboards.cloudcode.js.zip to download the file.

## Usage / Setup
To configure this script, simply import it into your app.

Then call it from your app via the RunScript() API call.

The script takes the following parameters:

leaderboards – Ids of leaderboards to post to.
score – new score being posted.
extra – extra data attached on leaderboard entry.

```json
// Example Parameters
{
   "leaderboards": ["regular", "alltime"],
   "score": 1000,
   "extras": {}
}
```