// DEPRECATED IN THIS APP. NO LONGER USED. THIS FUCTIONALITY MOVED TO APP.TSX AT THE TOP
// IMPLEMENTED WITH LISTENERS
//
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

const useOnlineManager = () => {
    const netInfo = useNetInfo();
    useEffect(() => {
        if (netInfo.type !== 'unknown')
            onlineManager.setOnline(!!netInfo.isInternetReachable);
        else onlineManager.setOnline(undefined);
    }, [netInfo.isInternetReachable, netInfo.type]);
};

export default useOnlineManager;
