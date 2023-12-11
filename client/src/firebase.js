// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e5e73.firebaseapp.com",
  projectId: "mern-estate-e5e73",
  storageBucket: "mern-estate-e5e73.appspot.com",
  messagingSenderId: "708992249506",
  appId: "1:708992249506:web:0e08c2e9f306a19884f1fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);