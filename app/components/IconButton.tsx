import {
    StyleSheet,
    Pressable,
    type ViewStyle,
    type ColorValue,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type IconProps = React.ComponentProps<typeof MaterialCommunityIcons>;

export type Props = {
    name: IconProps['name'];
    size?: number;
    color?: ColorValue;
    onPress?: () => void;
    style?: ViewStyle;
    isButton?: boolean;
};

const IconButton = ({ name, size, color, onPress, style }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [style ?? null, pressed && styles.pressed]}
        >
            <MaterialCommunityIcons name={name} size={size} color={color} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
});
