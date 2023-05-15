import { Modal, StyleSheet, View } from 'react-native';

import { Bar as ProgressBar } from 'react-native-progress';
import LottieView from 'lottie-react-native';

import COLORS from '../constants/colors';
import lottieDone from '../assets/animations/done.json';

interface Props {
    visible: boolean;
    progress: number;
    onComplete: () => void;
}

const LoadingIndicator = ({ visible, progress, onComplete }: Props) => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? (
                    <ProgressBar
                        color={COLORS.primary}
                        progress={progress}
                        width={200}
                    />
                ) : (
                    <LottieView
                        onAnimationFinish={onComplete}
                        source={lottieDone}
                        autoPlay
                        loop={false}
                        style={styles.animation}
                    />
                )}
            </View>
        </Modal>
    );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 150,
    },
});
