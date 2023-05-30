import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCS_V6kiyN6-DzGuHVfGTCfqR8V8J4a-qc",
  authDomain: "netflix-clone-92.firebaseapp.com",
  projectId: "netflix-clone-92",
  storageBucket: "netflix-clone-92.appspot.com",
  messagingSenderId: "255749177342",
  appId: "1:255749177342:web:fcb16ebd8865697b504aaf",
  measurementId: "G-VGBSB8PT80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
