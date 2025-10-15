// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-bhUEHVRNEskft5bKVsEeqq_IPgDq-Js",
  authDomain: "sign-in-e1c29.firebaseapp.com",
  projectId: "sign-in-e1c29",
  storageBucket: "sign-in-e1c29.firebasestorage.app",
  messagingSenderId: "233678530251",
  appId: "1:233678530251:web:c6d450e0407b3087719d4e",
  measurementId: "G-FX6VKF973P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  // try {
  //   localStorage.setItem('authInProgress', 'true');
  //   await signInWithRedirect(auth, googleProvider);
  //   console.log("Firebase: Redirect initiated for Google sign-in...");
  // } catch (error) {
  //   localStorage.removeItem('authInProgress');
  //   console.error("Firebase: Sign-in initiation error:", error);
  //   throw error;
  // }
// };

// export const handleRedirectResult = async () => {
//   console.log('Firebase: Handling redirect result...');
//   try {
//     const result = await getRedirectResult(auth);
//     if (result && result.user) {
//       console.log('Firebase: User signed in successfully via redirect:', result.user.email);
//       localStorage.removeItem('authInProgress');
//       return result.user;
//     } else {
//       console.log('Firebase: No redirect result found or user cancelled.');
//       if (localStorage.getItem('authInProgress') === 'true') {
//          localStorage.removeItem('authInProgress');
//       }
//       return null;
//     }
//   } catch (error) {
//     localStorage.removeItem('authInProgress');
//     console.error('Firebase: Redirect result error:', error);
//     throw error;
//   }
// };

// export const signOutUser = async () => {
//   try {
//     await signOut(auth);
//     console.log("Firebase: User signed out.");
//   } catch (error) {
//     console.error("Firebase: Error signing out:", error);
//     throw error;
//   }
// };

// export { onAuthStateChanged, doc, getDoc };