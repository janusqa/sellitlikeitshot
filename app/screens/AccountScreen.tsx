import { SectionList, View, StyleSheet } from 'react-native';

import ListItem, { type ListItemType } from '../components/lists/ListItem';
import COLORS from '../constants/colors';
import IconButton from '../components/IconButton';
import ListItemSeperator from '../components/lists/ListItemSeperator';
import ListSectionSeperator from '../components/lists/ListSectionSeperator';
import { type AccountNavCompositeScreenProps } from '../navigation/navigation';

const DATA: { title: string; data: ListItemType[] }[] = [
    {
        title: '',
        data: [
            {
                title: 'Janus QA',
                subTitle: 'janusqa@rn.com',
                image: require('../assets/mosh.jpg'),
            },
        ],
    },
    {
        title: '',
        data: [
            {
                title: 'My Listings',
                icon: {
                    name: 'format-list-bulleted',
                    size: 20,
                    color: COLORS.white,
                    style: {
                        backgroundColor: COLORS.primary,
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                },
            },
            {
                title: 'My Messages',
                targetScreen: 'Messages',
                icon: {
                    name: 'email',
                    size: 20,
                    color: COLORS.white,
                    style: {
                        backgroundColor: COLORS.secondary,
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                },
            },
        ],
    },
    {
        title: '',
        data: [
            {
                title: 'Sign Out',
                icon: {
                    name: 'logout',
                    size: 20,
                    color: COLORS.white,
                    style: {
                        backgroundColor: COLORS.yellow,
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                },
            },
        ],
    },
];

const AccountScreen = ({
    route,
    navigation,
}: AccountNavCompositeScreenProps<'Account'>) => {
    const style = route.params?.style;
    return (
        <View style={[styles.container, !!style && style]}>
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.subTitle}
                        image={item.image}
                        IconComponent={
                            item.icon ? <IconButton {...item.icon} /> : null
                        }
                        onPress={
                            item.targetScreen
                                ? () => navigation.navigate(item.targetScreen)
                                : undefined
                        }
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
