import { Platform } from 'react-native';
import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';
import { isDevice } from 'expo-device';

import COLORS from '../constants/colors';
import usePushNotifications from './usePushNotifications';
import { usePushNotificationsPermission } from './usePermissions';
import navigationContainerRef from '../navigation/navigationContainerRef';

Notifications.setNotificationHandler({
    handleNotification: () => {
        return new Promise((resolve) => {
            resolve({
                shouldPlaySound: true,
                shouldSetBadge: false,
                shouldShowAlert: true,
            });
        });
    },
});

if (Platform.OS === 'android') {
    void Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: COLORS.secondary,
    });
}

const useRegisterForPushNotification = () => {
    const {
        savePushNotificationMutation: { mutate: savePushToken },
    } = usePushNotifications();

    const { requestPushNotificationsPermission } =
        usePushNotificationsPermission();

    const lastNotificationResponse =
        Notifications.useLastNotificationResponse();

    useEffect(
        function () {
            const getPushNotificationToken = async () => {
                try {
                    const hasPermission =
                        await requestPushNotificationsPermission();
                    if (hasPermission && isDevice) {
                        const token =
                            await Notifications.getExpoPushTokenAsync();
                        savePushToken({
                            token: token.data,
                        });
                    }
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong';
                    console.log(message);
                }
            };
            void getPushNotificationToken();
        },
        [requestPushNotificationsPermission, savePushToken]
    );

    useEffect(
        function () {
            if (
                lastNotificationResponse &&
                lastNotificationResponse.notification.request.content.data
                    ?.notificationType &&
                lastNotificationResponse.actionIdentifier ===
                    Notifications.DEFAULT_ACTION_IDENTIFIER
            ) {
                if (
                    lastNotificationResponse.notification.request.content.data
                        .notificationType === 'Messages'
                ) {
                    navigationContainerRef.current?.navigate(
                        'AccountOverview',
                        { screen: 'Messages', initial: false }
                    );
                }
            }
        },
        [lastNotificationResponse]
    );
};

export default useRegisterForPushNotification;
