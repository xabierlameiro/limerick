// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
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
                try {
                    setDoc(doc(db, "tokens", currentToken), {
                        token: currentToken,
                        date: new Date(),
                    });
                } catch (e) {
                    console.log("No se ha podido guardar el token", e);
                }
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
    updateDoc,
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
