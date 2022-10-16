import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBLI4-11Y3yiN8xtckJxWUZWAKx2ekKqyM",
  authDomain: "chat-6f082.firebaseapp.com",
  projectId: "chat-6f082",
  storageBucket: "chat-6f082.appspot.com",
  messagingSenderId: "233231787392",
  appId: "1:233231787392:web:0f730879863b8b1af14d65",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
