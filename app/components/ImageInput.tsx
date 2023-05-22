import { StyleSheet, Image, View, Pressable, Alert } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../constants/colors';
import useMediaLibrary from '../hooks/useMediaLibrary';

interface Props {
    imageUri?: string;
    onChangeImage: (imageUri: string | undefined) => void;
}

const ImageInput = ({ imageUri, onChangeImage }: Props) => {
    const selectImage = useMediaLibrary();

    const handlePress = async () => {
        if (!imageUri) {
            const image = await selectImage();
            if (image) onChangeImage(image);
        } else {
            Alert.alert(
                'Delete',
                'Are you sure you want to delete this image?',
                [
                    { text: 'Yes', onPress: () => onChangeImage(imageUri) },
                    { text: 'No' },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress} style={styles.button}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <MaterialCommunityIcons
                        name="camera"
                        size={40}
                        color={COLORS.gray400}
                    />
                )}
            </Pressable>
        </View>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray100,
        borderRadius: 15,
        height: 100,
        width: 100,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
