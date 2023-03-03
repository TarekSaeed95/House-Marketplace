import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyA1KaJd2UUw9h-RR0mUnn_4E7zeVwmlkLc",
  authDomain: "house-marketplace-e7b79.firebaseapp.com",
  projectId: "house-marketplace-e7b79",
  storageBucket: "house-marketplace-e7b79.appspot.com",
  messagingSenderId: "776475405447",
  appId: "1:776475405447:web:c8633ab85e24ef900cdc22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore()