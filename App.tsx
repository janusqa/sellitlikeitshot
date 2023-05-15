import { StatusBar } from 'expo-status-bar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useOnlineManager from './app/hooks/useOnlineManager';
import useRefreshOnFocusApp from './app/hooks/useRefreshOnFocusApp';
import Screen from './app/components/Screen';
import { NavigationContainer } from './app/navigation/navigation';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

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
    useOnlineManager();
    useRefreshOnFocusApp();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <StatusBar style="auto" backgroundColor="transparent" />
                <Screen>
                    <NavigationContainer theme={navigationTheme}>
                        <AppNavigator />
                    </NavigationContainer>
                </Screen>
            </QueryClientProvider>
        </>
    );
};

export default App;
