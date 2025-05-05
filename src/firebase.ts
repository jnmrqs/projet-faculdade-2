// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcIZ8vF2X0WGsClGoOwPkiX0PI6JqjSks",
  authDomain: "pucpr-c1145.firebaseapp.com",
  projectId: "pucpr-c1145",
  storageBucket: "pucpr-c1145.firebasestorage.app",
  messagingSenderId: "195520792707",
  appId: "1:195520792707:web:7f2f80cf069c06e4d933b6",
  measurementId: "G-XNQQSH6R0Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
