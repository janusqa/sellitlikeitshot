import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import COLORS from '../constants/colors';

interface Props {
    visible: boolean;
}

const IndicatorOffline = ({ visible }: Props) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>No Internet Connection</AppText>
        </View>
    );
};

export default IndicatorOffline;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        height: 50,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
    },
});
