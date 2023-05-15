import { StyleSheet, Text, Pressable, type ColorValue } from 'react-native';

import COLORS from '../constants/colors';

export interface Props {
    title: string;
    color: ColorValue;
    onPress: () => Promise<void> | void;
    disabled?: boolean;
}

const AppButton = ({ title, color, onPress, disabled = false }: Props) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: color },
                pressed && styles.pressed,
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});
