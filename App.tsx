import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StatusBar as StatusBarRN, Switch } from 'react-native';
import Screen from './app/components/Screen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import IconButton from './app/components/IconButton';
import COLORS from './app/constants/colors';
import ListItem from './app/components/ListItem';
import ListItemDeleteAction from './app/components/ListItemDeleteAction';
import AccountsScreen from './app/screens/AccountsScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppText from './app/components/AppText';
import AppPicker from './app/components/AppPicker';
import AppPickerItem from './app/components/AppPickerItem';
import LoginScreen from './app/screens/LoginScreen';

const categories = [
    {
        title: 'Furniture',
        value: 1,
    },
    {
        title: 'Clothing',
        value: 2,
    },
    {
        title: 'Categories',
        value: 3,
    },
];

const App = () => {
    return (
        <Screen style={{ backgroundColor: COLORS.lightGray }}>
            <LoginScreen />
        </Screen>
    );
};

export default App;
