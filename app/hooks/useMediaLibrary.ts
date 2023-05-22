import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useMediaLibraryPermission } from './usePermissions';

const useMediaLibrary = () => {
    const { requestMediaLibraryPermission } = useMediaLibraryPermission();

    const selectImage = async () => {
        try {
            const hasPermission = await requestMediaLibraryPermission();
            if (hasPermission) {
                const result = await launchImageLibraryAsync({
                    mediaTypes: MediaTypeOptions.Images,
                    quality: 0.5,
                    base64: true,
                });
                if (!result.canceled) return result.assets[0].uri;
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Something went wrong';
            console.log(message);
        }
    };

    return selectImage;
};

export default useMediaLibrary;
