import { StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors';

const ListItemSeperator = () => {
    return <View style={styles.seperator} />;
};

export default ListItemSeperator;

const styles = StyleSheet.create({
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.gray100,
    },
});
