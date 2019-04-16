# ScriptScheduler

## Purpose
This script will schedule a script of an interval, and make sure it is not already scheduled. 

If the interval is less then 60 min, it will only make sure there is no duplicate within 1 hour.

If the interval is more then 60 min (i.e not < 60) it will make sure there is no duplicate within 24 hours.

## Script
Click [ScriptScheduler.cloudcode.js](ScriptScheduler.cloudcode.js) to download the file

## Usage
To configure this script, simply import it into your app.

Then call it at the beginning of the script that you want to recur. See the code example below:

DataCacheUpdate cloud code script

```json
// First, schedule this script to run again! 
// - Important to do this first - before any errors can occur!
var scriptProxy = bridge.getScriptServiceProxy();
var schedulerRetVal = scriptProxy.runScript( 
    "ScriptScheduler", 
    { "scriptName": “DataCacheUpdate",  "interval": 10, "args": {}}
);
// Now continue with this scripts activities!
// ...
```

In this example, the script will DataCacheUpdate run every 10 minutes, and even if the script is triggered manually it will not cause multiple scheduling of itself.