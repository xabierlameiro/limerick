export function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

export async function askUserPermission() {
    return await Notification.requestPermission();
}
