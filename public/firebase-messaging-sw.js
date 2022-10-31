// Scripts for firebase and firebase messaging
import { getFirebaseConfig } from "@/configs/firebase-config";
importScripts("https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging.js"
);

initializeApp(getFirebaseConfig());

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
