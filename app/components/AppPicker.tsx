import {
    Modal,
    Pressable,
    StyleSheet,
    View,
    type ViewStyle,
    FlatList,
    type ColorValue,
} from 'react-native';
import { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
import AppText from './AppText';
import AppButton from './AppButton';
import { type Props as PickerItemProps } from './AppPickerItem';
import { type IconProps } from './IconButton';

export interface Item {
    label: string;
    value: string | number;
    color?: ColorValue;
    icon?: IconProps['name'];
}

interface Props {
    icon?: IconProps['name'];
    placeholder: string;
    style?: ViewStyle;
    items: Item[];
    numColumns?: number;
    renderPickerItemComponent: (
        settings: PickerItemProps
    ) => React.ReactElement<PickerItemProps>;
    selectedItem: Item | null;
    onSelectItem: (item: Item) => void;
}

const AppPicker = ({
    icon,
    placeholder,
    style,
    items,
    numColumns,
    renderPickerItemComponent,
    selectedItem,
    onSelectItem,
}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Pressable onPress={() => setShowModal(true)}>
                <View style={[styles.container, !!style && style]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={COLORS.gray200}
                            style={styles.icon}
                        />
                    )}
                    <AppText
                        style={
                            selectedItem
                                ? styles.text
                                : { ...styles.text, ...styles.placeholder }
                        }
                    >
                        {selectedItem ? selectedItem.label : placeholder}
                    </AppText>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={COLORS.gray200}
                    />
                </View>
            </Pressable>
            <Modal visible={showModal} animationType="slide">
                <View style={styles.modal}>
                    <AppButton
                        title="close"
                        color={COLORS.primary}
                        onPress={() => setShowModal(false)}
                    />
                    <FlatList
                        data={items}
                        numColumns={numColumns}
                        keyExtractor={(item) => item.label}
                        renderItem={({ item }) =>
                            renderPickerItemComponent({
                                title: item.label,
                                icon: {
                                    color: item.color,
                                    name: item.icon,
                                },
                                onPress: () => {
                                    setShowModal(false);
                                    onSelectItem(item);
                                },
                            } as PickerItemProps)
                        }
                    />
                </View>
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
        backgroundColor: COLORS.gray100,
        borderRadius: 25,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
    placeholder: {
        color: COLORS.gray400,
    },
    modal: {
        padding: 10,
    },
});
