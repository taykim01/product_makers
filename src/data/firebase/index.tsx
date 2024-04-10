import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "kairos-3326d.firebaseapp.com",
    projectId: "kairos-3326d",
    storageBucket: "kairos-3326d.appspot.com",
    messagingSenderId: "85411976801",
    appId: "1:85411976801:web:556d7bf83b27b43e02bc20",
    measurementId: "G-GMLNZ1C0ZS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };