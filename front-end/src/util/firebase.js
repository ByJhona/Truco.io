


import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyB6IK2--EgrwyyIXxyLlLwHAIfnfw0XltM",
  authDomain: "truco-io.firebaseapp.com",
  projectId: "truco-io",
  storageBucket: "truco-io.appspot.com",
  databaseURL: "https://truco-io-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "126767736112",
  appId: "1:126767736112:web:e9f7992b402b5cc32f94f5",
  measurementId: "G-4HZ14XWYSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getDatabase()
export default app;
