import {
    Platform,
    StyleSheet,
    StatusBar as StatusBarRN,
    SafeAreaView,
    type ViewStyle,
} from 'react-native';
import COLORS from '../constants/colors';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Screen = ({ children, style }: Props) => {
    return (
        <SafeAreaView style={[styles.container, !!style && style]}>
            {children}
        </SafeAreaView>
    );
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBarRN.currentHeight : 0,
    },
});
