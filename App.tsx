import type React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    StatusBar as StatusBarRN,
    Switch,
    Alert,
    Button,
    Image,
} from 'react-native';
import Screen from './app/components/Screen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import IconButton from './app/components/IconButton';
import COLORS from './app/constants/colors';
import ListItem from './app/components/lists/ListItem';
import ListItemDeleteAction from './app/components/lists/ListItemDeleteAction';
import AccountsScreen from './app/screens/AccountsScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppText from './app/components/AppText';
import AppPicker from './app/components/AppPicker';
import AppPickerItem from './app/components/AppPickerItem';
import LoginScreen from './app/screens/LoginScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';

import {
    MyButtonWithIconElement,
    MyButtonWithIconComponent,
    MyButtonWithIconRenderFunc,
} from './app/screens/ComponetAsProp';
import { IconProps } from './app/components/IconButton';

import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';

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
        <Screen>
            <ListingEditScreen
                style={{ backgroundColor: COLORS.gray100, padding: 20 }}
            />
        </Screen>
    );
};

export default App;
