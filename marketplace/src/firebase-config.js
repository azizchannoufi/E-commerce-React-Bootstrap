// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth module if needed
// Your Firebase config (can be found in your Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyAP7VHw2Zwx5sBoh-Hkx4Ea--C2bSXgbfc",
    authDomain: "marketplace-4cd3b.firebaseapp.com",
    projectId: "marketplace-4cd3b",
    storageBucket: "marketplace-4cd3b.firebasestorage.app",
    messagingSenderId: "490559890467",
    appId: "1:490559890467:web:091a117d6bcdd92d093d96",
    measurementId: "G-YP9LDDWK27"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// You can now use Firebase Auth and other Firebase services
const auth = getAuth(app); // Firebase Authentication instance

export { app, auth };
