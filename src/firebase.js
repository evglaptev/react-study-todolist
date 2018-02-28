import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyB9lnOWc-6SkYbdO0tPSZyCY38VXNFVQsE",
  authDomain: "study-database.firebaseapp.com",
  databaseURL: "https://study-database.firebaseio.com",
  projectId: "study-database",
  storageBucket: "study-database.appspot.com",
  messagingSenderId: "631285676671"
};
firebase.initializeApp(config);
export const getDataBase = () => firebase.database();
