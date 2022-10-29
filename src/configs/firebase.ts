// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNbhUBpizRzmGxmkjlR7QqivNHE214wrE",
    authDomain: "limerick-366718.firebaseapp.com",
    projectId: "limerick-366718",
    storageBucket: "limerick-366718.appspot.com",
    messagingSenderId: "476495180585",
    appId: "1:476495180585:web:1b7dca4bd4090bb14c3d38",
    measurementId: "G-M6G86XEWWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// auth
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.languageCode = "en";

// db
const db = getFirestore(app);

// messaging

function requestPermission() {
    console.log("Requesting permission...");
    if (typeof Notification !== "undefined")
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                const messaging = getMessaging(app);
                getToken(messaging, {
                    vapidKey:
                        "BMUC9BAeZObLcEGwWT4bTInw2fm6dBcY333217KBjhsLFa4Ztvd4Rd881PxZuxrv4KhEHjKmZofCv6C_y3XG2pU",
                })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.info(
                                "Registration token available",
                                currentToken
                            );
                        } else {
                            console.error("Can no get token");
                        }
                    })
                    .catch((err) => {
                        console.error(
                            "An error occurred while retrieving token. ",
                            err
                        );
                    });
            } else {
                console.error("Do not have permissions");
            }
        });
}
requestPermission();

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
