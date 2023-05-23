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

declare module '@env' {
    export const REACT_APP_DEV_APP_API_BASE_URL: string;
}
