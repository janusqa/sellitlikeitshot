import { StyleSheet, View, type ViewStyle } from 'react-native';

import z from 'zod';
import {
    AppForm,
    AppFormTextIputField,
    AppFormSubmit,
} from '../components/forms';
import { REGEX_PWD } from '../constants/validation';
import COLORS from '../constants/colors';
import { type FieldValues } from 'react-hook-form';

const zFormData = z.object({
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

export type FormData = z.infer<typeof zFormData>;

interface Props {
    style?: ViewStyle;
}

const RegisterScreen = ({ style }: Props) => {
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };
    return (
        <View style={[styles.container, !!style && style]}>
            <AppForm schema={zFormData}>
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
                    onSubmit={onSubmit}
                />
            </AppForm>
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
