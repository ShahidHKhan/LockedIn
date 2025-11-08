import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);
export default app;