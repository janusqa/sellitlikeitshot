import { SectionList, View, StyleSheet, type ViewStyle } from 'react-native';

import ListItem, { type ListItemType } from '../components/lists/ListItem';
import COLORS from '../constants/colors';
import IconButton from '../components/IconButton';
import ListItemSeperator from '../components/lists/ListItemSeperator';
import ListSectionSeperator from '../components/lists/ListSectionSeperator';

const DATA: { title: string; data: ListItemType[] }[] = [
    {
        title: '',
        data: [
            {
                title: 'Mosh Hamedani',
                subTitle: 'programmingwithmosh@gmail.com',
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

interface Props {
    style?: ViewStyle;
}

const AccountsScreen = ({ style }: Props) => {
    return (
        <View style={[styles.container, !!style && style]}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.subTitle}
                        image={item.image}
                        IconComponent={
                            item.icon ? <IconButton {...item.icon} /> : null
                        }
                    />
                )}
                ItemSeparatorComponent={ListItemSeperator}
                SectionSeparatorComponent={ListSectionSeperator}
            />
        </View>
    );
};

export default AccountsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
