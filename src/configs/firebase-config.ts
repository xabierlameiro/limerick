const config = {
    apiKey: "AIzaSyBNbhUBpizRzmGxmkjlR7QqivNHE214wrE",
    authDomain: "limerick-366718.firebaseapp.com",
    projectId: "limerick-366718",
    storageBucket: "limerick-366718.appspot.com",
    messagingSenderId: "476495180585",
    appId: "1:476495180585:web:1b7dca4bd4090bb14c3d38",
    measurementId: "G-M6G86XEWWQ",
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        debugger;
        throw new Error(
            "No Firebase configuration object provided." +
                "\n" +
                "Add your web app's configuration object to firebase-config.js"
        );
    } else {
        return config;
    }
}
