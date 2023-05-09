import { Platform } from 'react-native';

import COLORS from './colors';

export default {
    text: {
        fontSize: 18,
        color: COLORS.gray400,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
};
