import {
    StyleSheet,
    View,
    Image,
    type ImageSourcePropType,
    type ViewStyle,
} from 'react-native';

import AppText from '../components/AppText';
import COLORS from '../constants/colors';
import UserProfileSmall from '../components/lists/ListItem';

interface Props {
    image: ImageSourcePropType;
    style?: ViewStyle;
}

const ListingDetailsScreen = ({ image, style }: Props) => {
    return (
        <View style={[styles.container, !!style && style]}>
            <Image style={styles.image} source={image} />
            <View style={styles.details}>
                <AppText style={styles.title}>Red jacket for sale!</AppText>
                <AppText style={styles.price}>$100</AppText>
                <View style={styles.profileContainer}>
                    <UserProfileSmall
                        image={require('../assets/mosh.jpg')}
                        title="Mosh Hamedani"
                        subTitle="5 Listings"
                    />
                </View>
            </View>
        </View>
    );
};

export default ListingDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
    },
    details: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    price: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    profileContainer: {
        marginVertical: 40,
    },
});
