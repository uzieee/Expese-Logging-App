// Import the functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTAZbwK6cL7fKjw03rbE26wiUn_q3I1F4",
  authDomain: "dbas-de7fb.firebaseapp.com",
  projectId: "dbas-de7fb",
  storageBucket: "dbas-de7fb.appspot.com",
  messagingSenderId: "576456233118",
  appId: "1:576456233118:web:7c4a544b8a81d983ec2b8f",
  measurementId: "G-L0H0KKFVEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics not supported in this environment");
    }
  });
}

export { db, analytics };