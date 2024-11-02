// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDadBre5X9NDXm5IBK79myOt5qPmF0SCdQ",
  authDomain: "hotelpro-8814e.firebaseapp.com",
  projectId: "hotelpro-8814e",
  storageBucket: "hotelpro-8814e.firebasestorage.app",
  messagingSenderId: "317602855332",
  appId: "1:317602855332:web:2aafb0a428f64b1945a931"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
