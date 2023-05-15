import { View, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

import lottieLoader from '../assets/animations/loader.json';

interface Props {
    visible: boolean;
}

const IndicatorActivity = ({ visible }: Props) => {
    if (!visible) return null;

    return (
        <View style={styles.container}>
            <LottieView source={lottieLoader} autoPlay loop />
        </View>
    );
};

export default IndicatorActivity;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
