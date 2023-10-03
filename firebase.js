// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACUB_iOraro0Uxm42ITY9u_TE117hxQIw",
  authDomain: "todolist-28174.firebaseapp.com",
  projectId: "todolist-28174",
  storageBucket: "todolist-28174.appspot.com",
  messagingSenderId: "449068043452",
  appId: "1:449068043452:web:14e46d258057c3651ed4b9",
  measurementId: "G-QX5562M0SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);