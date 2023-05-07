import { StyleSheet, View, Image, type ViewStyle } from 'react-native';

import { z } from 'zod';
import { type FieldValues } from 'react-hook-form';

import logo from '../assets/logo-red.png';
import COLORS from '../constants/colors';
import { REGEX_PWD } from '../constants/validation';
import { AppFormField, AppFormSubmit, AppForm } from '../components/forms';

const zFormData = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({ message: 'Must be a valid email' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password too short' })
        .max(24, { message: 'Password too long' })
        .regex(
            REGEX_PWD,
            'Password: 6-24 characters, 1 from each group: [A-Z], [a-z], [0-9], [!@#$%]'
        ),
});

export type FormData = z.infer<typeof zFormData>;

interface Props {
    style?: ViewStyle;
}

const LoginScreen = ({ style }: Props) => {
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <View style={[styles.container, !!style && style]}>
            <Image style={styles.logo} source={logo} />
            <AppForm schema={zFormData}>
                <AppFormField
                    name="email"
                    icon="email"
                    textInputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        placeholder: 'Email',
                        keyboardType: 'email-address',
                        textContentType: 'emailAddress',
                    }}
                />
                <AppFormField
                    name="password"
                    icon="lock"
                    textInputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        placeholder: 'Password',
                        textContentType: 'password',
                        secureTextEntry: true,
                    }}
                />
                <AppFormSubmit
                    title="Login"
                    color={COLORS.primary}
                    onSubmit={onSubmit}
                />
            </AppForm>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
});
