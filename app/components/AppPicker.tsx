import {
    Modal,
    Pressable,
    StyleSheet,
    View,
    type ViewStyle,
    FlatList,
} from 'react-native';
import { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
import AppText from './AppText';
import AppButton from './AppButton';
import AppPickerItem from './AppPickerItem';

export type IonIconName = React.ComponentProps<
    typeof MaterialCommunityIcons
>['name'];

interface Props<T extends { label: string }> {
    icon?: IonIconName;
    placeholder: string;
    items: T[];
    style?: ViewStyle;
    selectedItem: T | null;
    onSelectItem: (item: T) => void;
}

const AppPicker = <T extends { label: string }>({
    icon,
    style,
    placeholder,
    items,
    selectedItem,
    onSelectItem,
}: Props<T>) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Pressable onPress={() => setShowModal(true)}>
                <View style={[styles.container, !!style && style]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={COLORS.mediumGray}
                            style={styles.icon}
                        />
                    )}
                    <AppText style={styles.text}>
                        {selectedItem?.label ?? placeholder}
                    </AppText>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={COLORS.mediumGray}
                    />
                </View>
            </Pressable>
            <Modal visible={showModal} animationType="slide">
                <AppButton
                    title="close"
                    color={COLORS.primary}
                    onPress={() => setShowModal(false)}
                />
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <AppPickerItem
                            title={item.label}
                            onPress={() => {
                                setShowModal(false);
                                onSelectItem(item);
                            }}
                        />
                    )}
                />
            </Modal>
        </>
    );
};

export default AppPicker;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 25,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
});
