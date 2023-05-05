import { Pressable, StyleSheet, View, Image } from 'react-native';
import COLORS from '../constants/colors';
import AppText from './AppText';

interface Props {
    title: string;
    subTitle: string;
    image: any;
}

const Card = ({ title, subTitle, image }: Props) => {
    return (
        <View style={styles.container}>
            <Pressable>
                <Image style={styles.image} source={image} />
                <View style={styles.details}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.subTitle}>{subTitle}</AppText>
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
