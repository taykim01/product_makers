import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "askme-4548d.firebaseapp.com",
    projectId: "askme-4548d",
    storageBucket: "askme-4548d.appspot.com",
    messagingSenderId: "201975094781",
    appId: "1:201975094781:web:99786af1aba5f945064d94"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);