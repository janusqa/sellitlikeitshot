import {
    StyleSheet,
    TextInput,
    View,
    type TextInputProps,
    type ViewStyle,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
import defaultStyles from '../constants/styles';
import { type IconProps } from './IconButton';

interface Props {
    icon?: IconProps['name'];
    style?: ViewStyle;
    textInputProps?: TextInputProps;
}

const AppTextInput = ({ icon, style, textInputProps }: Props) => {
    return (
        <View style={[styles.container, !!style && style]}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={COLORS.gray400}
                    style={styles.icon}
                />
            )}
            <TextInput
                style={defaultStyles.text}
                {...textInputProps}
                placeholderTextColor={COLORS.gray400}
            />
        </View>
    );
};

export default AppTextInput;

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
});
