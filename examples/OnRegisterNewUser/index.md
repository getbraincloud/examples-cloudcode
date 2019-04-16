# OnRegisterNewUser
## Purpose
This script enforces any registration attempts made to brainCloud will fail if the account already exists.

Use this to enforce a proper signup/login flow, so a user cannot attempt to register multiple times with the same account.

Script also offers a place to put first-time registration logic, such as awarding currency or setting a default name of the user.

## Script
Click OnRegisterNewUser.cloudcode.js.zip to download the file.

## Usage / Setup
To configure this script, simply import it into your app.

The script assumes any authenticate call made with forceCreate set to false is a login attempt. And any authenticate call made with forceCreate set to false is a registration attempt.

You can have the script run on every authenticate call by setting it as a Post API Hook on Authenticate.