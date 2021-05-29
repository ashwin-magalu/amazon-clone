import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBij4P-NjjQgOV1WNCTaZm7fprYloXlPnI",
  authDomain: "ashwin-port.firebaseapp.com",
  projectId: "ashwin-port",
  storageBucket: "ashwin-port.appspot.com",
  messagingSenderId: "1042482694929",
  appId: "1:1042482694929:web:4eb2abe150d3c8addb1ab0",
  measurementId: "G-D5Q11S7LHR",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
