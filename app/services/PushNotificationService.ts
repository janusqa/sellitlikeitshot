import create from './ApiClient';

export interface PushNotificationToken {
    token: string;
}

export const CACHE_KEY_PUSH_NOTIFICATIONS = 'push_notifications';
export const ENDPOINT_PUSH_NOTIFICATIONS = '/expoPushTokens';

export default create<void, PushNotificationToken>(
    ENDPOINT_PUSH_NOTIFICATIONS,
    true
);
