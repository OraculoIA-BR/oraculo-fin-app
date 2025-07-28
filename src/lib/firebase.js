const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAmsrHbzO0hZgYwZssmgSXh3vWg0Gr_kJo",
  authDomain: "oraculo-6962d.firebaseapp.com",
  projectId: "oraculo-6962d",
  storageBucket: "oraculo-6962d.appspot.com",
  messagingSenderId: "688937341111",
  appId: "1:688937341111:web:2ae46838d1c123ccacfd32",
  measurementId: "G-ZB6B9M8P2V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };