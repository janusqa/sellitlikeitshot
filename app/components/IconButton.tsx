import { StyleSheet, Pressable, type ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type IonIconName = React.ComponentProps<
    typeof MaterialCommunityIcons
>['name'];

type Props = {
    icon: IonIconName;
    size: number;
    color: string;
    onPress?: () => void;
    style?: ViewStyle;
};

const IconButton = ({ icon, size, color, onPress, style }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [style ?? null, pressed && styles.pressed]}
        >
            <MaterialCommunityIcons name={icon} size={size} color={color} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
});
