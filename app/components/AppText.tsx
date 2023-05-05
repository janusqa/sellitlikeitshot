import { Text, type TextStyle } from 'react-native';

import defaultStyles from '../constants/styles';

interface Props {
    children: string;
    style?: TextStyle;
}

function AppText({ children, style }: Props) {
    return <Text style={[defaultStyles.text, style ?? null]}>{children}</Text>;
}

export default AppText;
