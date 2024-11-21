import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy-vKejfOsNOVQpHqXmj81OI-qrIa-6kQ",
  authDomain: "testing-3df92.firebaseapp.com",
  projectId: "testing-3df92",
  storageBucket: "testing-3df92.appspot.com",
  messagingSenderId: "388608685918",
  appId: "1:388608685918:web:f582ea6c9cbc3a591ec1cf",
  measurementId: "G-XYG5T90GDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

// Function to sign up with email and password
const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

// Function to sign in with email and password
const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};



export { auth, GoogleProvider, signUpWithEmail, signInWithEmail};
