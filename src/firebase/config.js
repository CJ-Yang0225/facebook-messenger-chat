import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDldZyrMclwgppMEJtpVSKEsgGqQGpVj-Q",
  authDomain: "facebook-messenger-chat.firebaseapp.com",
  projectId: "facebook-messenger-chat",
  storageBucket: "facebook-messenger-chat.appspot.com",
  messagingSenderId: "391001078752",
  appId: "1:391001078752:web:73d6973a9f60e42f6b0985",
  measurementId: "G-77GVC4X79R",
});

const db = firebaseApp.firestore();

export default db;
