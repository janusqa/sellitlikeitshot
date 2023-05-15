import { StyleSheet, View, Image } from 'react-native';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';

import logo from '../assets/logo-red.png';
import COLORS from '../constants/colors';
import { REGEX_PWD } from '../constants/validation';
import { AppFormTextIputField, AppFormSubmit } from '../components/forms';
import { type AuthNavScreenProps } from '../navigation/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const zFormInput = z.object({
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

export type FormInput = z.infer<typeof zFormInput>;

const LoginScreen = ({ route }: AuthNavScreenProps<'Login'>) => {
    const style = route.params?.style;
    const reactHookForm = useForm<FormInput>({
        resolver: zodResolver(zFormInput),
    });

    const onSubmit = (data: FormInput) => {
        console.log(data);
    };

    return (
        <View style={[styles.container, !!style && style]}>
            <Image style={styles.logo} source={logo} />
            <FormProvider {...reactHookForm}>
                <AppFormTextIputField
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
                <AppFormTextIputField
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
                    onSubmit={reactHookForm.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
});
