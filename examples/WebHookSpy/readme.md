# WebHookSpy

## Purpose
Used to discover and/or confirm the parameters being sent to a webhook.

The script simply:

* returns the parameters sent to it via the web response
* writes an info-level log record, viewable via the Recent Errors section of Monitoring

## Script
Click [WebHookSpy.cloudcode.js](WebHookSpy.cloudcode.js) to download the file.

## Usage / Setup
To configure this script, you must:

* First import it into your app
* Then go to [**Design | Cloud Code | WebHooks**](https://portal.braincloudservers.com/admin/dashboard#/development/core-webHooks), and link this script into a new or existing webhook
You can test calling the script using a browser, [Postman](https://www.getpostman.com/), or something similar – just to confirm that the logging is working.

You will then to go to the external system (the one that is calling the webhook), and do whatever is required to get it to invoke the webhook.

Finally, go to [**Monitoring | Global Monitoring | Recent Errors**](https://portal.braincloudservers.com/admin/dashboard#/monitoring/globallogs) page to view the results of invocation:

* change the filter to show info messages – enable the **[x]** checkbox by the green **“i”** and hit **[Refresh]**
* click on a log line to view the details. The parameters will be displayed in the Context field, which you can expand by dragging the bottom-right corner of the dialog