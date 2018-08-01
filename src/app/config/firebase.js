import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBcNJykTu2eSYd9QVDftWKQK46PJSlUzrQ",
  authDomain: "instagramclone-d795c.firebaseapp.com",
  databaseURL: "https://instagramclone-d795c.firebaseio.com",
  projectId: "instagramclone-d795c",
  storageBucket: "instagramclone-d795c.appspot.com",
  messagingSenderId: "1029372188954"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default firebase;
