import AccountScreen from '../screens/AccountScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import ListingsScreen from '../screens/ListingsScreen';
import { type AppNavParamList, createBottomTabNavigator } from './navigation';

const Tab = createBottomTabNavigator<AppNavParamList>();
const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Listings">
        <Tab.Screen name="Listings" component={ListingsScreen} />
        <Tab.Screen name="ListingEdit" component={ListingEditScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
);

export default AppNavigator;
