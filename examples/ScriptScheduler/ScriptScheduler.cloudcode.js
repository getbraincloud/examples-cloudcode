const scriptName = data.scriptName;
const interval = data.interval;
const args = data.args;
const searchSpan = interval < 60 ? 60 : 60 * 24;

var _script = bridge.getScriptServiceProxy();

// Find scheduled jobs matching given script name.
var dateTimeSpanMinsFromNowInMillis = new Date().getTime() + (searchSpan * 60 * 1000);
var result = _script.getScheduledCloudScripts(dateTimeSpanMinsFromNowInMillis);

var nowTime = new Date().getTime();

if ((result.status == 200) && (result.data !== null)) {
    // Find those that match script name want.
    for (var i = 0; i < result.data.scheduledJobs.length; i++) {
        // Delete any that match.
        if (result.data.scheduledJobs[i].scriptName === scriptName && result.data.scheduledJobs[i].scheduledStartTime > nowTime) {
            _script.cancelScheduledScript(result.data.scheduledJobs[i].jobId);
        }
    }
}

// Schedule single replacement.
var retVal = _script.scheduleRunScriptMinutes(scriptName, args, interval);

retVal;


//*** ------------- brainCloud meta-data begins now - do not hand-edit -----------------
// "scriptName":"ScriptScheduler",
// "clientCallable":true,
// "s2sCallable":false,
// "peerCallable":false,
// "scriptTimeout":10,
// "description":"Schedule re-occuring scripts, ensuring only one instance is to be schedule.",
// "parms":"{\\n  \\"scriptName\\": \\"CrowdSaleCacheUpdate\\",\\n  \\"interval\\": 3,\\n  \\"args\\":{}\\n}",
// "version":4,
// "updatedAt":1535565194836