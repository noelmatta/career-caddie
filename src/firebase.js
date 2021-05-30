import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDodnHoN1lhaJPBTc5ln7KzsUI91Ny387o",
  authDomain: "career-caddie.firebaseapp.com",
  projectId: "career-caddie",
  storageBucket: "career-caddie.appspot.com",
  messagingSenderId: "828482300798",
  appId: "1:828482300798:web:e4f3e152b48e926b68a12f"
};
firebase.initializeApp(config);

export default firebase;