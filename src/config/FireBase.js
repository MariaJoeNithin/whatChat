// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFt4CrdQYR4X-ds9rjKc9TqdnnRLtLVYg",
  authDomain: "whatchat-474ae.firebaseapp.com",
  projectId: "whatchat-474ae",
  storageBucket: "whatchat-474ae.appspot.com",
  messagingSenderId: "690603039287",
  appId: "1:690603039287:web:8e6a8e9d8b46c4f285fdb2",
  measurementId: "G-LWEYTDPTP7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
