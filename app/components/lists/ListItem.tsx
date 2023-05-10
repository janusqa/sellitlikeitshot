import {
    StyleSheet,
    Image,
    View,
    Pressable,
    type ViewStyle,
    type ImageSourcePropType,
} from 'react-native';
import {
    Swipeable,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../AppText';
import COLORS from '../../constants/colors';
import { type IconProps } from '../IconButton';

export interface ListItemType {
    title: string;
    subTitle?: string;
    image?: ImageSourcePropType;
    icon?: {
        name: IconProps['name'];
        size: number;
        color: string;
        style: ViewStyle;
    };
}

interface Props {
    title: string;
    subTitle?: string;
    image?: ImageSourcePropType;
    IconComponent?: React.ReactNode;
    onPress?: () => void;
    onSwipeLeft?: () => React.ReactNode;
}

const ListItem = ({
    title,
    subTitle,
    image,
    IconComponent,
    onPress,
    onSwipeLeft,
}: Props) => {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={onSwipeLeft}>
                <Pressable
                    style={({ pressed }) => [
                        styles.container,
                        pressed && styles.pressed,
                    ]}
                    onPress={onPress}
                >
                    {IconComponent && IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View
                        style={[
                            styles.detailsContainer,
                            !(IconComponent || image) && { marginLeft: 0 },
                        ]}
                    >
                        <AppText
                            style={styles.title}
                            textProps={{ numberOfLines: 1 }}
                        >
                            {title}
                        </AppText>
                        {subTitle && (
                            <AppText
                                style={styles.subTitle}
                                textProps={{ numberOfLines: 2 }}
                            >
                                {subTitle}
                            </AppText>
                        )}
                    </View>
                    <MaterialCommunityIcons
                        color={COLORS.gray200}
                        name="chevron-right"
                        size={25}
                    />
                </Pressable>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    pressed: {
        backgroundColor: COLORS.gray100,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    subTitle: {
        color: COLORS.gray300,
        fontSize: 16,
    },
});
