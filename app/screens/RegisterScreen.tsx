import { StyleSheet, View } from 'react-native';

import z from 'zod';
import { AppFormTextIputField, AppFormSubmit } from '../components/forms';
import { REGEX_PWD } from '../constants/validation';
import COLORS from '../constants/colors';
import { useForm, FormProvider } from 'react-hook-form';
import { type AuthNavScreenProps } from '../navigation/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

const zFormInput = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
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

const RegisterScreen = ({ route }: AuthNavScreenProps<'Register'>) => {
    const style = route.params?.style;
    const reactHookForm = useForm<FormInput>({
        resolver: zodResolver(zFormInput),
    });

    const onSubmit = (data: FormInput) => {
        console.log(data);
    };
    return (
        <View style={[styles.container, !!style && style]}>
            <FormProvider {...reactHookForm}>
                <AppFormTextIputField
                    icon="account"
                    name="name"
                    textInputProps={{
                        autoCorrect: false,
                        placeholder: 'Name',
                    }}
                />
                <AppFormTextIputField
                    icon="email"
                    name="email"
                    textInputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        keyboardType: 'email-address',
                        placeholder: 'Email',
                        textContentType: 'emailAddress',
                    }}
                />
                <AppFormTextIputField
                    icon="lock"
                    name="password"
                    textInputProps={{
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        placeholder: 'Password',
                        secureTextEntry: true,
                        textContentType: 'password',
                    }}
                />
                <AppFormSubmit
                    title="Register"
                    color={COLORS.primary}
                    onSubmit={reactHookForm.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default RegisterScreen;
