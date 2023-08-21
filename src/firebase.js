import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDckH9IIB2TNRhOsFX-GjWKFchlFvOmx_I",
  authDomain: "stackoverflow-a8628.firebaseapp.com",
  databaseURL: "https://stackoverflow-a8628-default-rtdb.firebaseio.com",
  projectId: "stackoverflow-a8628",
  storageBucket: "stackoverflow-a8628.appspot.com",
  messagingSenderId: "98029016327",
  appId: "1:98029016327:web:19953ec7c15b22a7f521a2",
  measurementId: "G-GSJ3ECDM3K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const database = firebase.database();

export {auth, database}