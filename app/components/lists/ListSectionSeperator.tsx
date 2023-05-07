import { StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors';

const ListSectionSeperator = () => {
    return <View style={styles.seperator} />;
};

export default ListSectionSeperator;

const styles = StyleSheet.create({
    seperator: {
        width: '100%',
        height: 18,
        backgroundColor: COLORS.lightGray,
    },
});
