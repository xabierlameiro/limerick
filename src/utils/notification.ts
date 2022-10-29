export function isPushNotificationSupported() {
    return typeof Notification !== "undefined";
}

export async function askUserPermission() {
    return await Notification.requestPermission();
}
