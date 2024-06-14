// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
require('dotenv').config();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "ejercicio-tienda-5704c.firebaseapp.com",
  projectId: "ejercicio-tienda-5704c",
  storageBucket: "ejercicio-tienda-5704c.appspot.com",
  messagingSenderId: "409084759666",
  appId: "1:409084759666:web:91f3243682bd6675873ceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);