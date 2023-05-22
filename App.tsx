import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

import {
    QueryClient,
    QueryClientProvider,
    onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

import useRefreshOnFocusApp from './app/hooks/useRefreshOnFocusApp';
import Screen from './app/components/Screen';
import { NavigationContainer } from './app/navigation/navigation';
import navigationTheme from './app/navigation/navigationTheme';
import IndicatorOffline from './app/components/IndicatorOffline';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import { useAccessToken, useAuthActions } from './app/store/authStore';
import secureStore from './app/services/secureStore';
import navigationContainerRef from './app/navigation/navigationContainerRef';
import logger from './app/services/ConsoleLogger';
import { useConfigStore } from './app/store/configStore';

useConfigStore.setState({
    logger,
});

void preventAutoHideAsync()
    .then((result) =>
        useConfigStore
            .getState()
            .logger?.info(
                `SplashScreen.preventAutoHideAsync() succeeded: ${String(
                    result
                )}`
            )
    )
    .catch((error) => logger.warn(error));

onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
    });
});

const queryClient = new QueryClient({
    // we can override default options here or per query
    // one of the popular ones to override per query is staleTime
    defaultOptions: {
        queries: {
            retry: 3,
            cacheTime: 1000 * 60 * 5, // default 5 mins
            staleTime: 1000 * 10, // 10 seconds
            refetchOnWindowFocus: true, //  default true
            refetchOnReconnect: true, // default true
            refetchOnMount: true, // default true
        },
    },
});

const App = () => {
    const [appIsReady, setIsappIsReady] = useState<boolean>(false);
    const accessToken = useAccessToken();
    const login = useAuthActions().login;

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) await hideAsync();
    }, [appIsReady]);

    useRefreshOnFocusApp();

    useEffect(
        function () {
            const restoreSession = async () => {
                const accessToken = await secureStore.get('accessToken');
                if (!accessToken) return;
                login(accessToken);
            };

            if (!!accessToken) return;

            void restoreSession()
                .catch((error) => {
                    logger.error(error);
                })
                .finally(() => {
                    setIsappIsReady(true);
                });
        },
        [login, accessToken]
    );

    if (!appIsReady) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="auto" backgroundColor="transparent" />
            <Screen>
                <IndicatorOffline visible={!onlineManager.isOnline()} />
                <NavigationContainer
                    ref={navigationContainerRef}
                    theme={navigationTheme}
                    onReady={onLayoutRootView}
                >
                    {!!accessToken ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </Screen>
        </QueryClientProvider>
    );
};

export default App;
