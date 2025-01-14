
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA77hFrRHHJTgQY0P0vYfbFJb7VrhXdShk",
  authDomain: "olx-react-179fc.firebaseapp.com",
  projectId: "olx-react-179fc",
  storageBucket: "olx-react-179fc.firebasestorage.app",
  messagingSenderId: "226952512436",
  appId: "1:226952512436:web:59aea77d087d9bc8afa8e1"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth(Firebase);
export const db = getFirestore(Firebase);
export const storage = getStorage(Firebase);