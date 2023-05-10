import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import {
    type AuthNavParamList,
    createNativeStackNavigator,
} from './navigation';

const Stack = createNativeStackNavigator<AuthNavParamList>();
const AuthNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

export default AuthNavigator;
