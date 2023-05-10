import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from './app/navigation/navigation';

import Screen from './app/components/Screen';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

const App = () => {
    return (
        <>
            <StatusBar style="auto" backgroundColor="transparent" />
            <Screen>
                <NavigationContainer theme={navigationTheme}>
                    <AppNavigator />
                </NavigationContainer>
            </Screen>
        </>
    );
};

export default App;
