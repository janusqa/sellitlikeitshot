import { View, Text, StyleSheet } from 'react-native';
import { type ComponentType, type ReactElement } from 'react';
import { type IconProps } from '../../App';
import React from 'react';

interface MyButtonWithIconElementProps {
    children: string;
    icon: ReactElement<IconProps>;
}

// failed at setting a default value
export const MyButtonWithIconElement = ({
    children,
    icon,
}: MyButtonWithIconElementProps) => {
    const clonedIcon = React.cloneElement(icon, {
        size: icon.props.size ?? 100,
    });
    return (
        <View style={styles.container}>
            {clonedIcon}
            <Text>{children}</Text>
        </View>
    );
};

interface MyButtonWithIconComponentProps {
    children: string;
    Icon: ComponentType<IconProps>;
}

export const MyButtonWithIconComponent = ({
    children,
    Icon,
}: MyButtonWithIconComponentProps) => {
    return (
        <View style={styles.container}>
            <Icon name="heart-box" size={20} />
            <Text>{children}</Text>
        </View>
    );
};

// How to use MyButtonWithIconComponentProps
//
// Declare the reference outside the compnent or it will be remade each re-render
// const MyIcon = (settings: IconProps) => (
//     <MaterialCommunityIcons {...settings} name="heart" color="red" />
// );
//
{
    /* <MyButtonWithIconComponent Icon={MyIcon}>
Submit
</MyButtonWithIconComponent> */
}

interface MyButtonWithIconRenderFuncProps {
    children: string;
    renderIcon: (settings: IconProps) => ReactElement<IconProps>;
}

export const MyButtonWithIconRenderFunc = ({
    children,
    renderIcon,
}: MyButtonWithIconRenderFuncProps) => {
    return (
        <View style={styles.container}>
            {renderIcon({ size: 20 } as IconProps)}
            <Text>{children}</Text>
        </View>
    );
};

// How to use MyButtonWithIconRenderFunc
//
{
    /* <MyButtonWithIconRenderFunc
                renderIcon={(settings: IconProps) => (
                    <MaterialCommunityIcons
                        {...settings}
                        size={50}
                        name="trash-can"
                        color="red"
                    />
                )}
            >
                Submit
            </MyButtonWithIconRenderFunc> */
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
