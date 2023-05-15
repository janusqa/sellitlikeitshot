import { Pressable, StyleSheet, View, Image } from 'react-native';
import COLORS from '../constants/colors';
import AppText from './AppText';

interface Props {
    title: string;
    subTitle: string;
    image: string;
    onPress: () => void;
}

const Card = ({ title, subTitle, image, onPress }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <Image style={styles.image} source={{ uri: image }} />
                <View style={styles.details}>
                    <AppText
                        style={styles.title}
                        textProps={{ numberOfLines: 1 }}
                    >
                        {title}
                    </AppText>
                    <AppText
                        style={styles.subTitle}
                        textProps={{ numberOfLines: 3 }}
                    >
                        {subTitle}
                    </AppText>
                </View>
            </Pressable>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        padding: 20,
    },
    title: {
        marginBottom: 7,
    },
    subTitle: {
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
});
