const {setGlobalOptions} = require("firebase-functions");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

setGlobalOptions({maxInstances: 10});

// Troca: use functions.auth.user().onCreate
exports.createUserDocument = functions.auth.user().onCreate(async (user) => {
  const {uid, email, displayName} = user;
  const userDoc = {
    email: email || "",
    displayName: displayName || "",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await admin.firestore().collection("users").doc(uid).set(userDoc);
  logger.info(`Usuário ${uid} criado em users/${uid}`);
});