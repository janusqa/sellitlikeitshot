import { createNavigationContainerRef } from '@react-navigation/native';
import type {
    AccountNavParamList,
    AppNavParamList,
    AuthNavParamList,
    FeedNavParamList,
} from './navigation';

export type NavigationContainerRef = AppNavParamList &
    AuthNavParamList &
    FeedNavParamList &
    AccountNavParamList;

const navigationContainerRef =
    createNavigationContainerRef<NavigationContainerRef>();

export default navigationContainerRef;
