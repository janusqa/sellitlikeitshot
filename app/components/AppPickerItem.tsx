import { Pressable, StyleSheet } from 'react-native';
import AppText from './AppText';

interface Props {
    title: string;
    onPress: () => void;
}

const AppPickerItem = ({ title, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={onPress}
        >
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
