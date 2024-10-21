import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPvcK1-Od3NbQ5J8ICZE3dKLsACxWu7ig",
  authDomain: "tutorial-app-e73db.firebaseapp.com",
  projectId: "tutorial-app-e73db",
  storageBucket: "tutorial-app-e73db.appspot.com",
  messagingSenderId: "134898918636",
  appId: "1:134898918636:web:62089bc34c2dced04b31c9",
};

export const fbInit = initializeApp(firebaseConfig);

export const firestoreInit = getFirestore(fbInit);

export const auth = getAuth(fbInit);
