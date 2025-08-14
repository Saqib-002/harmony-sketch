// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVMvyehyFBlmo_tADktuHZBgDNEuYKYDE",
  authDomain: "harmony-sketch.firebaseapp.com",
  projectId: "harmony-sketch",
  storageBucket: "harmony-sketch.firebasestorage.app",
  messagingSenderId: "644018828637",
  appId: "1:644018828637:web:9ee66945ceac08a6fc64b4",
  measurementId: "G-M44XJWSJ5C"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)