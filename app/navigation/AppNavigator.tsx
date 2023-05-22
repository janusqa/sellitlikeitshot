import ListingEditScreen from '../screens/ListingEditScreen';
import AccountNavigator from './AccountNavigator';
import FeedNavigator from './FeedNavigator';
import NewListingButton from './NewListingButton';
import {
    type AppNavParamList,
    createBottomTabNavigator,
    type AppNavScreenProps,
} from './navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRegisterForPushNotification from '../hooks/useRegisterForPushNotification';

const Tab = createBottomTabNavigator<AppNavParamList>();

const AppNavigator = () => {
    useRegisterForPushNotification();

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ListingEdit"
                component={ListingEditScreen}
                options={({
                    navigation,
                }: AppNavScreenProps<'ListingEdit'>) => ({
                    title: 'Edit Listing',
                    tabBarButton: () => (
                        //this overrieds tabBarIcon
                        <NewListingButton
                            onPress={() => navigation.navigate('ListingEdit')}
                        />
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            size={size}
                            color={color}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="AccountOverview"
                component={AccountNavigator}
                options={{
                    title: 'Account',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
