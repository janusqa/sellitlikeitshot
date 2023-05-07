import { Text, type TextProps, type TextStyle } from 'react-native';

import defaultStyles from '../constants/styles';

interface Props {
    children: string;
    style?: TextStyle;
    textProps?: TextProps;
}

function AppText({ children, style, textProps }: Props) {
    return (
        <Text style={[defaultStyles.text, style ?? null]} {...textProps}>
            {children}
        </Text>
    );
}

export default AppText;
