import { type ColorValue, Pressable, StyleSheet } from 'react-native';
import AppText from './AppText';
import { type Props as IconButtonProps } from './IconButton';

export interface Props {
    title: string;
    onPress: () => void;
    icon?: { color: ColorValue; name: IconButtonProps['name'] };
    renderIcon?: (
        settings: IconButtonProps
    ) => React.ReactElement<IconButtonProps>;
}

const AppPickerItem = ({ title, onPress, renderIcon }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={onPress}
        >
            {!!renderIcon && renderIcon({ size: 20 } as IconButtonProps)}
            <AppText style={styles.text}>{title}</AppText>
        </Pressable>
    );
};

export default AppPickerItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    text: {
        padding: 10,
    },
});
