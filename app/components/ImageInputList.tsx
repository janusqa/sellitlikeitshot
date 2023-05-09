import { StyleSheet, View, ScrollView } from 'react-native';
import ImageInput from './ImageInput';
import { useRef } from 'react';

interface Props {
    imageUris: string[];
    onRemoveImage: (imageUri: string | undefined) => void;
    onAddImage: (imageUri: string | undefined) => void;
}

const ImageInputList = ({ imageUris, onRemoveImage, onAddImage }: Props) => {
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        // wrap scrollview in view to contrain it. By default it takes up as
        // much space as possible, while a view is the opposite. It only takes
        // up the neccessary space. This will stop the scrollview from
        // pushing around other elements around it.
        <View>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
            >
                <View style={styles.container}>
                    {imageUris.map((imageUri) => (
                        <View style={styles.image} key={imageUri}>
                            <ImageInput
                                imageUri={imageUri}
                                onChangeImage={onRemoveImage}
                            />
                        </View>
                    ))}
                    <ImageInput onChangeImage={onAddImage} />
                </View>
            </ScrollView>
        </View>
    );
};

export default ImageInputList;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    image: {
        marginRight: 10,
    },
});
