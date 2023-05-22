import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import AppText from '../components/AppText';
import COLORS from '../constants/colors';
import UserProfileSmall from '../components/lists/ListItem';
import { type FeedNavCompositeScreenProps } from '../navigation/navigation';
import ContactSellerForm from '../components/ContactSellerForm';

const ListingDetailsScreen = ({
    route,
}: FeedNavCompositeScreenProps<'ListingDetails'>) => {
    const style = route.params?.style;
    const listing = route.params?.listing;

    return (
        <ScrollView style={[!!style && style]}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="position"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
            >
                {
                    <Image
                        style={styles.image}
                        source={{ uri: listing.images[0].url }}
                    />
                }
                <View style={styles.details}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    <AppText style={styles.price}>
                        {listing.price.toString()}
                    </AppText>
                    <View style={styles.profileContainer}>
                        <UserProfileSmall
                            image={require('../assets/mosh.jpg')}
                            title="Mosh Hamedani"
                            subTitle="5 Listings"
                        />
                    </View>
                </View>
                <ContactSellerForm />
            </KeyboardAvoidingView>
        </ScrollView>
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
        marginTop: 20,
    },
});
