// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirebaseConfig } from "@/configs/firebase-config";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());
// const analytics = getAnalytics(app);

// auth
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "en";

// db
const db = getFirestore(app);

// messaging
export function requestPermission() {
    const messaging = getMessaging(app);
    getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_PUSH_KEY,
    })
        .then((currentToken) => {
            if (currentToken) {
                console.info("Registration token available", currentToken);
                const messaging = getMessaging();
                onMessage(messaging, (payload) => {
                    console.log("Message received. ", payload);
                });
            } else {
                console.error("Can no get token");
            }
        })
        .catch((err) => {
            console.error("An error occurred while retrieving token. ", err);
        });
}

export {
    getDoc,
    setDoc,
    db,
    doc,
    auth,
    signInWithPopup,
    provider,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
};
