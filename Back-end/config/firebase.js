// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseServiceAccount.json'); // Adjust the path as needed

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "marketplace-4cd3b", // Ensure this matches your Firebase project ID
});

// Get the Firestore instance
const db = admin.firestore();

// Set Firestore to ignore undefined properties
db.settings({
  ignoreUndefinedProperties: true,
});

module.exports = admin;
