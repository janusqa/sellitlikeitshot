import {
    Accuracy,
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
    // type LocationObject,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useLocation = () => {
    const [locationPermission, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    }>();

    useEffect(
        function () {
            const verifyPermission = async () => {
                if (
                    locationPermission &&
                    (locationPermission.status ===
                        PermissionStatus.UNDETERMINED ||
                        locationPermission.status === PermissionStatus.DENIED)
                ) {
                    const permissionResponse = await requestPermission();
                    return permissionResponse.granted;
                }

                return true;
            };

            const getLocationHandler = async () => {
                try {
                    const hasPermission = await verifyPermission();
                    if (hasPermission) {
                        const location = await getCurrentPositionAsync({
                            accuracy: Accuracy.High,
                        });
                        setLocation({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                    } else {
                        throw new Error(
                            'This app requires access to your location'
                        );
                    }
                } catch (error) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong';
                    Alert.alert('Location Error', message);
                }
            };

            void getLocationHandler();
        },
        [locationPermission, requestPermission]
    );

    return location;
};

export default useLocation;
