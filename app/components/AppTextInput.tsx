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

export type IonIconName = React.ComponentProps<
    typeof MaterialCommunityIcons
>['name'];

interface Props {
    icon?: IonIconName;
    style?: ViewStyle;
    textInputProps?: TextInputProps;
}

const AppTextInput = ({ icon, style, textInputProps }: Props) => {
    return (
        <>
            <View style={[styles.container, !!style && style]}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={COLORS.mediumGray}
                        style={styles.icon}
                    />
                )}
                <TextInput style={defaultStyles.text} {...textInputProps} />
            </View>
        </>
    );
};

export default AppTextInput;

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
});
