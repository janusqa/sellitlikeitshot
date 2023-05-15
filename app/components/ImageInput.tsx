import { StyleSheet, Image, View, Pressable, Alert } from 'react-native';

import {
    launchImageLibraryAsync,
    useMediaLibraryPermissions,
    PermissionStatus,
    MediaTypeOptions,
} from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import COLORS from '../constants/colors';

interface Props {
    imageUri?: string;
    onChangeImage: (imageUri: string | undefined) => void;
}

const ImageInput = ({ imageUri, onChangeImage }: Props) => {
    const [permission, requestPermission] = useMediaLibraryPermissions();

    const verifyPermission = async () => {
        if (permission && permission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (permission && permission.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient permission!',
                'You need to grant camera access to use this app'
            );
            return false;
        }
        return true;
    };

    const selectImage = async () => {
        const hasPermission = await verifyPermission();

        if (hasPermission) {
            try {
                const result = await launchImageLibraryAsync({
                    mediaTypes: MediaTypeOptions.Images,
                    quality: 0.5,
                    base64: true,
                });
                if (!result.canceled) onChangeImage(result.assets[0].uri);
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong';
                console.log(message);
            }
        }
    };

    const handlePress = () => {
        if (!imageUri) {
            void selectImage();
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
