import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    type ViewStyle,
} from 'react-native';

import backgroundImage from '../assets/background.jpg';
import logo from '../assets/logo-red.png';
import COLORS from '../constants/colors';
import AppButton from '../components/AppButton';
import { type AuthNavScreenProps } from '../navigation/navigation';

const WelcomeScreen = ({
    route,
    navigation,
}: AuthNavScreenProps<'Welcome'>) => {
    return (
        <View
            style={[
                styles.container,
                !!route.params?.style && route.params.style,
            ]}
        >
            <ImageBackground
                blurRadius={10}
                style={styles.background}
                source={backgroundImage}
            >
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.tagline}>
                        Sell What You Don&apos;t Need
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                        title="login"
                        color={COLORS.primary}
                        onPress={() => navigation.navigate('Login')}
                    />
                    <AppButton
                        title="register"
                        color={COLORS.secondary}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        top: 50,
    },
    logo: {
        width: 100,
        height: 100,
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
    },
    tagline: {
        fontSize: 25,
        fontWeight: '600',
        paddingVertical: 20,
    },
});
