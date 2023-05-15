import { StyleSheet, View } from 'react-native';
import ErrorMessage from './ErrorMessage';
import AppButton from './AppButton';
import COLORS from '../constants/colors';
import AppText from './AppText';

interface Props {
    error: unknown;
    buttonTitle: string;
    visible: boolean;
    onPress: () => Promise<void> | void;
}

const ErrorFallBack = ({ error, buttonTitle, visible, onPress }: Props) => {
    if (!visible) return null;

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Oops!</AppText>
            <AppText style={styles.subTitle}>An error has occured</AppText>
            <ErrorMessage
                message={
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred'
                }
            />
            <AppButton
                title={buttonTitle}
                onPress={onPress}
                color={COLORS.primary}
            />
        </View>
    );
};

export default ErrorFallBack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 48,
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
