# Handy Cloud Code Scripts

The following scripts implement common operations that may be handy for your app.

-   [BlockIfBanned](BlockIfBanned/readme.md) – blocks banned users from logging into your app
-   [DeleteListOfUsers](DeleteListOfUsers/readme.md) – deletes a list of provided users
-   [OnRegisterNewUser](OnRegisterNewUser/readme.md) – ensures registration calls will fail if the user already exists. Offers a place to put first-time signup logic
-   [PostToLeaderboards](PostToLeaderboards/readme.md) – efficiently post to multiple leaderboards
-   [RankGame_AutoJoinMatch](RankGame_AutoJoinMatch/readme.md) – pair two players looking for an async match
-   [RankGame_FinishMatch](RankGame_FinishMatch/readme.md) – handle the conclusion of a match. Adjust player ratings based on winner/loser
-   [RestrictClientCalls](RestrictClientCalls/readme.md) – restricts the client’s ability to call brainCloud APIs. Provides additional security.
-   [ScriptScheduler](ScriptScheduler/readme.md) – helper script for regularly recurring cloud code jobs
-   [SharedScripts](SharedScripts/readme.md) – example of sharing scripts between cloud code with [Global Properties](https://getbraincloud.com/apidocs/apiref/#cc-bridge-getglobalproperty)
-   [WebHookSpy](WebHookSpy/readme.md) – view the parameters being sent to a webhook
-   [UniqueGroups_AcceptGroupMember](UniqueGroups_AcceptGroupMember/readme.md) – enforce new group members to exist in only one group at a time

## Importing Scripts

To import a script into your app:

-   Download the script to your computer
-   Go to the [**Design | Cloud Code | Scripts**](https://portal.braincloudservers.com/login#/development/serverscripts-edit) page of the portal
-   Choose Import Scripts from the **[Import / Export]** button
    -   Click **[Select]**, choose the script to import from the file selector
    -   Click **[Import]**
