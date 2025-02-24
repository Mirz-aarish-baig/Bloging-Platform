import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXI-gJ1goKoJFEa9mcwP66gKnzInGBsUc",
  authDomain: "socialconnect-493c7.firebaseapp.com",
  projectId: "socialconnect-493c7",
  storageBucket: "socialconnect-493c7.firebasestorage.app",
  messagingSenderId: "939057615638",
  appId: "1:939057615638:web:2c1b5d199900b1e346b637",
};

export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);
