// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHeq302PbIVNBHQaghS5XPkJ_Ztm5M3LY",
  authDomain: "test-project-14dab.firebaseapp.com",
  projectId: "test-project-14dab",
  storageBucket: "test-project-14dab.appspot.com",
  messagingSenderId: "536492421836",
  appId: "1:536492421836:web:44eef659572f4fbe794869",
  measurementId: "G-C984H8GRBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };