import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "clearunusedkey",
  authDomain: "lockedin-clearunusedkey.firebaseapp.com",
  projectId: "lockedin-clearunusedkey",
  storageBucket: "lockedin-78279.firebasestorage.app",
  messagingSenderId: "419795335179",
  appId: "1:clearunusedkey:web:clearunusedkey",
  measurementId: "G-clearunusedkey"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);
export default app;
