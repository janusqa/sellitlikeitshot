import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';

import {
    type FeedNavParamList,
    createNativeStackNavigator,
} from './navigation';

const Stack = createNativeStackNavigator<FeedNavParamList>();
const FeedNavigator = () => (
    <Stack.Navigator initialRouteName="Listings">
        <Stack.Screen name="Listings" component={ListingsScreen} />
        <Stack.Screen
            name="ListingDetails"
            component={ListingDetailsScreen}
            options={{ title: 'Listing Details' }}
        />
    </Stack.Navigator>
);

export default FeedNavigator;
