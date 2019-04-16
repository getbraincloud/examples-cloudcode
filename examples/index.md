# Handy Cloud Code Scripts

The following scripts implement common operations that may be handy for your app.

* BlockIfBanned – blocks banned users from logging into your app
* OnRegisterNewUser – ensures registration calls will fail if the user already exists. Offers a place to put first-time signup logic
* PostToLeaderboards – efficiently post to multiple leaderboards
* RankGame_AutoJoinMatch – pair two players looking for an async match
* RankGame_FinishMatch – handle the conclusion of a match. Adjust player ratings based on winner/loser
* RestrictClientCalls – restricts the client’s ability to call brainCloud APIs. Provides additional security.
* ScriptScheduler – helper script for regularly recurring cloud code jobs
* UniqueGroups_AcceptGroupMember – enforce new group members to exist in only one group at a time
* WebHookSpy – view the parameters being sent to a webhook

## Importing Scripts
To import a script into your app:

* Download the script to your computer
* Go to the Design | Cloud Code | Scripts page of the portal
* Choose Import Scripts from the [Import / Export] button
    * Click [Select], choose the script to import from the file selector
    * Click [Import]