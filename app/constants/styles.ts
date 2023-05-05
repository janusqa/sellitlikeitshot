import { Platform } from 'react-native';

import COLORS from './colors';

export default {
    text: {
        fontSize: 18,
        color: COLORS.darkGray,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
};
