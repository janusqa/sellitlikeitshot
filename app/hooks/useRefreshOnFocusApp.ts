import { useEffect } from 'react';
import { AppState, Platform, type AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';

const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
    }
};

const useRefreshOnFocusApp = () => {
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            onAppStateChange
        );

        return () => subscription.remove();
    }, []);
};

export default useRefreshOnFocusApp;
