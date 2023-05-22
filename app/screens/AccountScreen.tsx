import {
    SectionList,
    View,
    StyleSheet,
    type ViewStyle,
    type ColorValue,
} from 'react-native';
import { useMemo } from 'react';

import ListItem, { type ListItemType } from '../components/lists/ListItem';
import COLORS from '../constants/colors';
import IconButton from '../components/IconButton';
import ListItemSeperator from '../components/lists/ListItemSeperator';
import ListSectionSeperator from '../components/lists/ListSectionSeperator';
import { type AccountNavCompositeScreenProps } from '../navigation/navigation';
import { useUser, useAuthActions } from '../store/authStore';
import { type IconProps } from '../components/IconButton';
import avatar from '../assets/mosh.jpg';

const getIcon = (name: IconProps['name'], backgroundColor: ColorValue) => ({
    name,
    size: 20,
    color: COLORS.white,
    style: {
        backgroundColor,
        width: 40,
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
});

const AccountScreen = ({
    route,
    navigation,
}: AccountNavCompositeScreenProps<'Account'>) => {
    const style = route.params?.style;

    const user = useUser();
    const logout = useAuthActions().logout;

    const menu: { title: string; data: ListItemType[] }[] = useMemo(
        () => [
            {
                title: 'Personal',
                data: [
                    {
                        title: user?.name ?? 'No user',
                        subTitle: user?.email ?? '',
                        image: avatar,
                    },
                ],
            },
            {
                title: 'Social',
                data: [
                    {
                        title: 'My Listings',
                        icon: getIcon('format-list-bulleted', COLORS.primary),
                    },
                    {
                        title: 'My Messages',
                        onPress: () => navigation.navigate('Messages'),
                        icon: getIcon('email', COLORS.secondary),
                    },
                ],
            },
            {
                title: 'Authentication',
                data: [
                    {
                        title: 'Sign Out',
                        icon: getIcon('logout', COLORS.yellow),
                        onPress: () => logout(),
                    },
                ],
            },
        ],
        [logout, navigation, user?.email, user?.name]
    );

    return (
        <View style={[styles.container, !!style && style]}>
            <SectionList
                sections={menu}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.subTitle}
                        image={item.image}
                        IconComponent={
                            item.icon ? <IconButton {...item.icon} /> : null
                        }
                        onPress={item.onPress}
                    />
                )}
                ItemSeparatorComponent={ListItemSeperator}
                SectionSeparatorComponent={ListSectionSeperator}
            />
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
