import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCzg5s55bZLE1-TixAdYPwQpfWU-BRF5is",
  authDomain: "diagnosadiabetes.firebaseapp.com",
  projectId: "diagnosadiabetes",
  storageBucket: "diagnosadiabetes.appspot.com",
  messagingSenderId: "384420908539",
  appId: "1:384420908539:web:9e8955283803bc2bcc0f5e"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
