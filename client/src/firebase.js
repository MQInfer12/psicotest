import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseEnvironment } from "./env";

export const app = initializeApp(firebaseEnvironment);
export const db = getFirestore();
