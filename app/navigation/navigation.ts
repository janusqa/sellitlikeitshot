// General Naviagation imports
export {
    NavigationContainer,
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';

// Native Stack Navagation
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export { createNativeStackNavigator } from '@react-navigation/native-stack';

// Bottom Tab Navigation
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { type ViewStyle } from 'react-native';
export { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Navigation (Native Stack)
export type AuthNavParamList = {
    Welcome: { style?: ViewStyle } | undefined;
    Login: { style?: ViewStyle } | undefined;
    Register: { style?: ViewStyle } | undefined;
};
export type AuthNavScreenProps<T extends keyof AuthNavParamList> =
    NativeStackScreenProps<AuthNavParamList, T>;

// App Navigation (Bottom Tab)
export type AppNavParamList = {
    Listings: { style?: ViewStyle } | undefined;
    ListingEdit: { style?: ViewStyle } | undefined;
    Account: { style?: ViewStyle } | undefined;
};
export type AppNavScreenProps<T extends keyof AppNavParamList> =
    BottomTabScreenProps<AppNavParamList, T>;

export type AppNativeStackParamList = {
    Tweets: undefined;
    TweetDetails: { tweetId: number };
};
// This is an example of a nested navigation
// We first define the type of Prop for the navigation
// Then we next it using CompositeScreenProps
// The first element to CompositeScreenProps is the child nav, with the route
// The second parameter is a list of the navs that it is nested in. In this case one.
export type AppNativeStackScreenProps<T extends keyof AppNativeStackParamList> =
    NativeStackScreenProps<AppNativeStackParamList, T>;
export type AppNativeStackCompositeScreenProps<
    T extends keyof AppNativeStackParamList
> = CompositeScreenProps<
    AppNativeStackScreenProps<T>,
    AppBottomTabScreenProps<keyof AppBottomTabParamList>
>;

// Bottom Tab Navigation

export type AppBottomTabParamList = {
    Feed: NavigatorScreenParams<AppNativeStackParamList>; // Nested Navigation
    Account: undefined;
};
export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> =
    BottomTabScreenProps<AppBottomTabParamList, T>;

// ************************************//
// *** !!!EXAMPLES DO NOT DELETE!!! ***
// ************************************//
// IMPORT packages that create the menus
//
// import {
//     NavigationContainer,
//     NavigatorScreenParams,
//     useNavigation,
//     useRoute,
// } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// DEFINE SCREEN PROPS
//
// import type {
//     CompositeScreenProps,
//     NavigatorScreenParams,
// } from '@react-navigation/native';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// export type Props = CompositeScreenProps<
//     BottomTabScreenProps<BottoTabsParamList, 'AllExpenses'>,
//     NativeStackScreenProps<NativeStackParamList>
// >;

// export type PlaceStackParamList = {
//     AllPlaces: undefined;
//     AddPlace: { location: { lat: number; lng: number } } | undefined;
//     Map: { location: { lat: number; lng: number } } | undefined;
//     PlaceDetails: { placeId: number };
// };

// export type PlaceNativeStackScreenProps<T extends keyof PlaceStackParamList> =
//     NativeStackScreenProps<PlaceStackParamList, T>;

// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends AuthNativeStackParamList {}
//     }
// }

// to access page props
// DefinedProps<'screenname'>

// to access navigation props and route props
// const navigation = useNavigation<DefinedProps<'screenname'>['navigation']>();
// const route = useRoute<DefinedProps<'screenname'>['route']>();

// when the  parms for one route is to another menue system
// export type NativeStackParamList = {
//     ManageExpense: { expenseId?: string };
//     ExpensesOverview: NavigatorScreenParams<BottoTabsParamList>;
// };
