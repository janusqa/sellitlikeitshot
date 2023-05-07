import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

interface Props {
    message: string | null | undefined;
}

const ErrorMessage = ({ message }: Props) => {
    if (!message) return null;
    return (
        <View style={styles.container}>
            <AppText style={styles.error}>{message}</AppText>
        </View>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
    },
});
