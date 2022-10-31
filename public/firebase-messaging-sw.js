// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//     apiKey: "AIzaSyBNbhUBpizRzmGxmkjlR7QqivNHE214wrE",
//     authDomain: "limerick-366718.firebaseapp.com",
//     projectId: "limerick-366718",
//     storageBucket: "limerick-366718.appspot.com",
//     messagingSenderId: "476495180585",
//     appId: "1:476495180585:web:1b7dca4bd4090bb14c3d38",
//     measurementId: "G-M6G86XEWWQ",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBNbhUBpizRzmGxmkjlR7QqivNHE214wrE",
    authDomain: "limerick-366718.firebaseapp.com",
    projectId: "limerick-366718",
    storageBucket: "limerick-366718.appspot.com",
    messagingSenderId: "476495180585",
    appId: "1:476495180585:web:1b7dca4bd4090bb14c3d38",
    measurementId: "G-M6G86XEWWQ",
};

try {
    if (firebase.messaging.isSupported()) {
        if (!firebase?.apps?.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }

        // Retrieve an instance of Firebase Messaging so that it can handle background
        // messages.
        const messaging = firebase.messaging();

        const parseFirebaseMessage = (data) => {
            const keys = Object.keys(data);
            const tempData = { ...data };

            keys.forEach((key) => {
                if (typeof tempData[key] === "string") {
                    tempData[key] = JSON.parse(tempData[key]);
                }
            });

            return tempData;
        };

        messaging.onBackgroundMessage(async (payload) => {
            console.log(
                "[firebase-messaging-sw.js] Received background original message ",
                payload
            );

            if (payload.data) {
                const parsedData = payload?.data?.message
                    ? null
                    : parseFirebaseMessage(payload.data);
                console.log(
                    "[firebase-messaging-sw.js] Received background parsed message ",
                    parsedData,
                    self.registration
                );

                // Hide notifications trick
                return new Promise(function (resolve, reject) {
                    resolve();
                    setTimeout(function () {
                        self.registration
                            .getNotifications()
                            .then((notifications) => {
                                notifications.forEach((notification) => {
                                    notification.close();
                                });
                            });
                    }, 100);
                });
            }
        });
    }
} catch (e) {
    console.error("[firebase-messaging-sw.js] - error: ", e.message);
}
