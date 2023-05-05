import {
    StyleSheet,
    Image,
    View,
    Pressable,
    type ViewStyle,
} from 'react-native';
import {
    Swipeable,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import AppText from './AppText';
import COLORS from '../constants/colors';
import type React from 'react';
import { type IonIconName } from './IconButton';

export interface ListItemType {
    title: string;
    subTitle?: string;
    image?: any;
    icon?: {
        icon: IonIconName;
        size: number;
        color: string;
        style: ViewStyle;
    };
}

interface Props {
    title: string;
    subTitle?: string;
    image?: any;
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
                        <AppText style={styles.title}>{title}</AppText>
                        {subTitle && (
                            <AppText style={styles.subTitle}>
                                {subTitle}
                            </AppText>
                        )}
                    </View>
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
        backgroundColor: COLORS.lightGray,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    subTitle: {
        color: COLORS.mediumGray,
        fontSize: 14,
    },
});
