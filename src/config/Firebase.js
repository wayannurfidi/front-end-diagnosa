import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWAO_JiDL4EGgaYkRtR8zmgRsBp0uGKmk",
  authDomain: "diabetes-3eaa7.firebaseapp.com",
  projectId: "diabetes-3eaa7",
  storageBucket: "diabetes-3eaa7.appspot.com",
  messagingSenderId: "1009343470830",
  appId: "1:1009343470830:web:4e60c03c78d82422a2a7ff",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
