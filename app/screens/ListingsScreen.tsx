import { StyleSheet, View, type ViewStyle } from 'react-native';
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

interface Props {
    style?: ViewStyle;
}

const ListingsScreen = ({ style }: Props) => {
    return (
        <View style={[styles.container, !!style && style]}>
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
    },
});
