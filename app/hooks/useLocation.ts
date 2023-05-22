import {
    Accuracy,
    getCurrentPositionAsync,
    // type LocationObject,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { useLocationForegroundPermission } from './usePermissions';
import { useConfigStore } from '../store/configStore';

const useLocation = () => {
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    }>();
    const { requestLocationForegroundPermission } =
        useLocationForegroundPermission();

    useEffect(
        function () {
            const getLocationHandler = async () => {
                try {
                    const hasPermission =
                        await requestLocationForegroundPermission();
                    if (hasPermission) {
                        const location = await getCurrentPositionAsync({
                            accuracy: Accuracy.High,
                        });
                        setLocation({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                    }
                } catch (error) {
                    // const message =
                    //     error instanceof Error
                    //         ? error.message
                    //         : 'Something went wrong';
                    useConfigStore.getState().logger?.error(error);
                }
            };

            void getLocationHandler();
        },
        [requestLocationForegroundPermission]
    );

    return location;
};

export default useLocation;
