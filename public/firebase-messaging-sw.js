// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

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

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

try {
    messaging.onBackgroundMessage(function (payload) {
        console.log(
            "[firebase-messaging-sw.js] Received background message ",
            payload
        );
        const notification = payload.data;
        if (!notification) {
            console.warn(
                "[firebase-messaging-sw.js] Unknown notification on message ",
                payload
            );
            return;
        }

        const notificationOptions = {
            lang: "en-IE",
            body: notification.body,
            icon: notification.image,
            tag: notification.tag,
            requireInteraction: true,
            vibrate: [200, 100, 200],
        };

        self.registration.showNotification(
            notification.title,
            notificationOptions
        );
    });

    self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        const url = "https://couplelookinghomeinlimerick.com/search";
        event.waitUntil(
            clients
                .matchAll({
                    includeUncontrolled: true,
                    type: "window",
                })
                .then((clientList) => {
                    for (const client of clientList) {
                        if (client.url === url && "focus" in client)
                            return client.focus();
                    }
                    if (clients.openWindow) return clients.openWindow(url);
                })
        );
    });
} catch (e) {
    console.error("firebase-messaging-sw.js error", e);
}
