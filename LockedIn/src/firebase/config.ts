// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCICh7rqp55u28E0vd2GTd0_FeLJPh2_rw",
  authDomain: "lockedin-78279.firebaseapp.com",
  projectId: "lockedin-78279",
  storageBucket: "lockedin-78279.firebasestorage.app",
  messagingSenderId: "419795335179",
  appId: "1:419795335179:web:58f9be1e97560792b32f0e",
  measurementId: "G-GXY0CQWC0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);