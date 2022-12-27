import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/* const firebaseConfig = {
  apiKey: "AIzaSyBLI4-11Y3yiN8xtckJxWUZWAKx2ekKqyM",
  authDomain: "chat-6f082.firebaseapp.com",
  projectId: "chat-6f082",
  storageBucket: "chat-6f082.appspot.com",
  messagingSenderId: "233231787392",
  appId: "1:233231787392:web:0f730879863b8b1af14d65",
}; */
const firebaseConfig = {
  apiKey: "AIzaSyCUeC6cVfMwskmqX3zvh583vgE9GeVQO4k",
  authDomain: "psicologia-6c533.firebaseapp.com",
  projectId: "psicologia-6c533",
  storageBucket: "psicologia-6c533.appspot.com",
  messagingSenderId: "727714804176",
  appId: "1:727714804176:web:56380ff9ea96b6fa4ec9d5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
