declare module '*.jpg' {
    import { type ImageSourcePropType } from 'react-native';
    const src: ImageSourcePropType; // you can also set this to string
    export default src;
}

declare module '*.png' {
    import { type ImageSourcePropType } from 'react-native';
    const src: ImageSourcePropType; // you can also set this to string
    export default src;
}
