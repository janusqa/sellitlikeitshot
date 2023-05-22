import { useCallback } from 'react';
import { Linking, Alert, Platform } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as IntentLauncher from 'expo-intent-launcher';

const openSettings = () => {
    if (Platform.OS === 'ios') void Linking.openURL('app-settings:');
    if (Platform.OS === 'android') {
        const pkg =
            Constants.manifest?.releaseChannel ??
            Constants.manifest?.android?.package ??
            'host.exp.exponent';
        void IntentLauncher.startActivityAsync(
            IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
            { data: `package:${pkg}` }
        );
    }
};

const openPermissionAlert = (permission: string) => {
    Alert.alert(
        'Permission needed',
        `This app does not have permission to access your ${permission}.`,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Open Settings', onPress: () => openSettings() },
        ]
    );
};

export const useMediaLibraryPermission = () => {
    const [permission, requestPermission] = MediaLibrary.usePermissions();

    const requestMediaLibraryPermission = useCallback(async () => {
        if (permission?.granted) return true;
        if (
            permission?.status === MediaLibrary.PermissionStatus.UNDETERMINED ||
            permission?.canAskAgain
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (!permission?.granted && permission?.canAskAgain)
            openPermissionAlert('Media Library');
        return false;
    }, [
        permission?.canAskAgain,
        permission?.granted,
        permission?.status,
        requestPermission,
    ]);
    return { requestMediaLibraryPermission };
};

export const useCameraPermission = () => {
    const [permission, requestPermission] =
        Camera.Camera.useCameraPermissions();

    const requestCameraPermission = useCallback(async () => {
        if (permission?.granted) return true;
        if (
            permission?.status === Camera.PermissionStatus.UNDETERMINED ||
            permission?.canAskAgain
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (!permission?.granted && permission?.canAskAgain)
            openPermissionAlert('Camera');
        return false;
    }, [
        permission?.canAskAgain,
        permission?.granted,
        permission?.status,
        requestPermission,
    ]);
    return { requestCameraPermission };
};

export const useLocationForegroundPermission = () => {
    const [permission, requestPermission] = Location.useForegroundPermissions();

    const requestLocationForegroundPermission = useCallback(async () => {
        if (permission?.granted) return true;
        if (
            permission?.status === Location.PermissionStatus.UNDETERMINED ||
            permission?.canAskAgain
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (!permission?.granted && permission?.canAskAgain)
            openPermissionAlert('Location');

        return false;
    }, [
        permission?.canAskAgain,
        permission?.granted,
        permission?.status,
        requestPermission,
    ]);
    return { requestLocationForegroundPermission };
};

export const useLocationBackgroundPermission = () => {
    const [permission, requestPermission] = Location.useBackgroundPermissions();

    const requestLocationBackgroundPermission = useCallback(async () => {
        if (permission?.granted) return true;
        if (
            permission?.status === Location.PermissionStatus.UNDETERMINED ||
            permission?.canAskAgain
        ) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (!permission?.granted && permission?.canAskAgain)
            openPermissionAlert('Location');
        return false;
    }, [
        permission?.canAskAgain,
        permission?.granted,
        permission?.status,
        requestPermission,
    ]);
    return { requestLocationBackgroundPermission };
};

export const usePushNotificationsPermission = () => {
    const [permission, requestPermission] = Notifications.usePermissions();

    const requestPushNotificationsPermission = useCallback(async () => {
        if (permission?.granted) return true;
        if (permission?.status === 'undetermined' || permission?.canAskAgain) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (!permission?.granted && permission?.canAskAgain)
            openPermissionAlert('Location');
        return false;
    }, [
        permission?.canAskAgain,
        permission?.granted,
        permission?.status,
        requestPermission,
    ]);
    return { requestPushNotificationsPermission };
};
