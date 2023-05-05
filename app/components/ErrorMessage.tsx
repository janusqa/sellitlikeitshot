import { StyleSheet } from 'react-native';

import AppText from './AppText';

interface Props {
    message: string | null | undefined;
}

const ErrorMessage = ({ message }: Props) => {
    if (!message) return null;
    return <AppText style={styles.error}>{message}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
});
