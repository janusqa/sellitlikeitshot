import { StyleSheet, Image, View, type ViewStyle } from 'react-native';

import IconButton from '../components/IconButton';
import imgChair from '../assets/chair.jpg';
import COLORS from '../constants/colors';

interface Props {
    style?: ViewStyle;
}

const ViewImageScreen = ({ style }: Props) => {
    return (
        <View style={[styles.container, !!style && style]}>
            <IconButton
                style={styles.closeIcon}
                name="close"
                color={COLORS.white}
                size={35}
                onPress={() => {
                    console.log('Close');
                }}
            />
            <IconButton
                style={styles.deleteIcon}
                name="trash-can-outline"
                color={COLORS.white}
                size={35}
                onPress={() => {
                    console.log('Delete');
                }}
            />
            <Image style={styles.image} source={imgChair} />
        </View>
    );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        left: 30,
    },
    deleteIcon: {
        position: 'absolute',
        top: 20,
        right: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
        top: 50,
    },
});
