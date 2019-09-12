import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAMst7WppHivnp_2ZUK2P_tpUpVFpiLeN4",
  authDomain: "english-words-25f7d.firebaseapp.com",
  databaseURL: "https://english-words-25f7d.firebaseio.com",
  projectId: "english-words-25f7d",
  storageBucket: "english-words-25f7d.appspot.com",
  messagingSenderId: "324613985164",
  appId: "1:324613985164:web:a83de7dda9d5f30f"
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

export default firestore;
