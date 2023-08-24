// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// https://chat-app-f6b4a-default-rtdb.firebaseio.com/

const firebaseConfig = {
  apiKey: "AIzaSyASq2wJafU2zOevs71CsfDSQ0xsdyryD1A",
  authDomain: "chat-app-22-dd0de.firebaseapp.com",
  projectId: "chat-app-22-dd0de",
  storageBucket: "chat-app-22-dd0de.appspot.com",
  messagingSenderId: "98474491665",
  appId: "1:98474491665:web:d7b0f111b32167f5a3d6b0"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

