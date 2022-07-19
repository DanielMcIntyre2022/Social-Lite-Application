
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyDfg1QnXPkUmC-9mx8gU5ZVXJEpDug8YKU",
  authDomain: "social-lite-database.firebaseapp.com",
  projectId: "social-lite-database",
  storageBucket: "social-lite-database.appspot.com",
  messagingSenderId: "1069841463531",
  appId: "1:1069841463531:web:9bbfd17652c4e493c5a6ae",
  measurementId: "G-JTJP4QGGC0"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);