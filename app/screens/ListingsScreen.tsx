import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import Card from '../components/Card';
import { type FeedNavCompositeScreenProps } from '../navigation/navigation';
import COLORS from '../constants/colors';
import useListings from '../hooks/useListings';
import useRefreshOnFocusScreen from '../hooks/useRefreshOnfocusScreen';
import useRefreshOnUser from '../hooks/useRefreshOnUser';
import ErrorFallBack from '../components/ErrorFallback';
import IndicatorActivity from '../components/IndicatorActivity';

const ListingsScreen = ({
    route,
    navigation,
}: FeedNavCompositeScreenProps<'Listings'>) => {
    const style = route.params?.style;
    const {
        data: listings,
        isError,
        error,
        isLoading,
        refetch,
    } = useListings();
    useRefreshOnFocusScreen(refetch);
    const { refreshByUser } = useRefreshOnUser(refetch);

    if (isError)
        return (
            <ErrorFallBack
                error={error}
                buttonTitle="Try again"
                visible={isError}
                onPress={refreshByUser}
            />
        );

    if (isLoading) return <IndicatorActivity visible={isLoading} />;

    return (
        <View style={[styles.container, !!style && style]}>
            <FlatList
                data={listings}
                initialNumToRender={10}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={`$${item.price.toString()}`}
                        image={item.images[0].url}
                        defaultImage={item.images[0].thumbnailUrl}
                        onPress={() =>
                            navigation.navigate('ListingDetails', {
                                listing: item,
                            })
                        }
                    />
                )}
            />
        </View>
    );
};

export default ListingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.gray100,
    },
});
