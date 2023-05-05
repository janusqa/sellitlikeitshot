import { StyleSheet, View, Image } from 'react-native';
import AppText from '../components/AppText';
import COLORS from '../constants/colors';
import UserProfileSmall from '../components/ListItem';

interface Props {
    image: any;
}

const ListingDetailsScreen = ({ image }: Props) => {
    return (
        <View>
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
