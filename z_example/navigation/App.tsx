import { StatusBar } from 'expo-status-bar';
import { Button, Text } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    useNavigation,
    NavigationContainer,
    createNativeStackNavigator,
    type AppNativeStackParamList,
    type AppNativeStackScreenProps,
    createBottomTabNavigator,
    type AppBottomTabParamList,
} from './navigation';

const Tweets = ({ navigation }: AppNativeStackScreenProps<'Tweets'>) => (
    <>
        <Text>Tweets</Text>
        <Button
            title="Tweet"
            onPress={() => navigation.navigate('TweetDetails', { tweetId: 1 })}
        />
        <Link />
    </>
);
const TweetDetails = ({ route }: AppNativeStackScreenProps<'TweetDetails'>) => (
    <Text>Tweet Details: {route.params.tweetId}</Text>
);

const Account = () => <Text>Account</Text>;

const Link = () => {
    const navigation =
        useNavigation<AppNativeStackScreenProps<'Tweets'>['navigation']>();
    return (
        <Button
            title="Click me"
            onPress={() => navigation.navigate('TweetDetails', { tweetId: 1 })}
        />
    );
};

const Stack = createNativeStackNavigator<AppNativeStackParamList>();
const StackNavigator = () => (
    <Stack.Navigator
        initialRouteName="Tweets"
        screenOptions={{
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'white',
        }}
    >
        <Stack.Screen
            name="Tweets"
            component={Tweets}
            options={{
                title: 'Tweets',
            }}
        />
        <Stack.Screen
            name="TweetDetails"
            component={TweetDetails}
            options={({ route }) => ({
                title: `Tweet Details: ${route.params.tweetId}`,
            })}
        />
    </Stack.Navigator>
);

const Tab = createBottomTabNavigator<AppBottomTabParamList>();
const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
            tabBarActiveBackgroundColor: 'white',
            tabBarActiveTintColor: 'white',
            tabBarInactiveBackgroundColor: 'white',
            tabBarInactiveTintColor: 'white',
        }}
    >
        <Tab.Screen
            name="Feed"
            component={StackNavigator}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="home"
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
        <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
);

const App = () => {
    return (
        <>
            <StatusBar style="light" backgroundColor="white" />
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </>
    );
};

export default App;
