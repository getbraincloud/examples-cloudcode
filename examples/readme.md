# Handy Cloud Code Scripts

The following scripts implement common operations that may be handy for your app.

* [BlockIfBanned](BlockIfBanned/readme.md) – blocks banned users from logging into your app
* [OnRegisterNewUser](OnRegisterNewUser/readme.md) – ensures registration calls will fail if the user already exists. Offers a place to put first-time signup logic
* [PostToLeaderboards](PostToLeaderboards/readme.md) – efficiently post to multiple leaderboards
* [RankGame_AutoJoinMatch](RankGame_AutoJoinMatch/readme.md) – pair two players looking for an async match
* [RankGame_FinishMatch](RankGame_FinishMatch/readme.md) – handle the conclusion of a match. Adjust player ratings based on winner/loser
* [RestrictClientCalls](RestrictClientCalls/readme.md) – restricts the client’s ability to call brainCloud APIs. Provides additional security.
* [ScriptScheduler](ScriptScheduler/readme.md) – helper script for regularly recurring cloud code jobs
* [UniqueGroups_AcceptGroupMember](UniqueGroups_AcceptGroupMember/readme.md) – enforce new group members to exist in only one group at a time
* [WebHookSpy](WebHookSpy/readme.md) – view the parameters being sent to a webhook

## Importing Scripts
To import a script into your app:

* Download the script to your computer
* Go to the Design | Cloud Code | Scripts page of the portal
* Choose Import Scripts from the [Import / Export] button
    * Click [Select], choose the script to import from the file selector
    * Click [Import]