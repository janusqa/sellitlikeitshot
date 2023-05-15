import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

const useOnlineManager = () => {
    const netInfo = useNetInfo();
    useEffect(() => {
        onlineManager.setOnline(!!netInfo.isInternetReachable);
    }, [netInfo.isInternetReachable]);
};

export default useOnlineManager;
