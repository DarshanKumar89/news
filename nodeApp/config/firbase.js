/**
 * Firebase application file
 */

"use strict";

var firebaseAdmin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://news-9e8c6.firebaseio.com/"
});

module.exports = firebaseAdmin;
