import { StyleSheet, View } from 'react-native';

import COLORS from '../../constants/colors';
import IconButton from '../IconButton';

interface Props {
    onPress: () => void;
}

const ListItemDeleteAction = ({ onPress }: Props) => {
    return (
        <View style={styles.container}>
            <IconButton
                name="trash-can"
                color={COLORS.white}
                size={35}
                onPress={onPress}
            />
        </View>
    );
};

export default ListItemDeleteAction;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.danger,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
