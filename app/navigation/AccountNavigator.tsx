import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import {
    type AccountNavParamList,
    createNativeStackNavigator,
} from './navigation';

const Stack = createNativeStackNavigator<AccountNavParamList>();
const AccountNavigator = () => (
    <Stack.Navigator initialRouteName="Account">
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
);

export default AccountNavigator;
