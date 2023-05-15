import { Pressable, StyleSheet, View } from 'react-native';
import COLORS from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
}

const NewListingButton = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <MaterialCommunityIcons
                    name="plus-circle"
                    size={40}
                    color={COLORS.white}
                />
            </Pressable>
        </View>
    );
};

export default NewListingButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
        borderWidth: 10,
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 25,
    },
    pressed: {
        opacity: 0.7,
    },
});
