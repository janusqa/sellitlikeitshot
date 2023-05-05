import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import Card from '../components/Card';

const listings = [
    {
        id: 1,
        title: 'Red jacket for sale',
        price: 100,
        image: require('../assets/jacket.jpg'),
    },
    {
        id: 2,
        title: 'Couch in great condition',
        price: 1000,
        image: require('../assets/couch.jpg'),
    },
];

const ListingsScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={`$${item.price.toString()}`}
                        image={item.image}
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
        padding: 15,
    },
});
