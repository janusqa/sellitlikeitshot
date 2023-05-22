import { Keyboard, StyleSheet, View } from 'react-native';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { scheduleNotificationAsync } from 'expo-notifications';

import COLORS from '../constants/colors';
import { AppFormSubmit, AppFormTextIputField } from './forms';
import { useRoute, type FeedNavScreenProps } from '../navigation/navigation';
import ErrorFallBack from './ErrorFallback';
import useAddMessage from '../hooks/useAddMessage';

const FormInput = z.object({
    message: z
        .string({ required_error: 'message is required' })
        .min(1, { message: 'Message is required' }),
});

export type FormInput = z.infer<typeof FormInput>;

const defaultValues = {
    message: '',
};

const ContactSellerForm = () => {
    const route = useRoute<FeedNavScreenProps<'ListingDetails'>['route']>();
    const listingId = route.params.listing.id;

    const reactHookForm = useForm<FormInput>({
        resolver: zodResolver(FormInput),
        defaultValues,
    });

    const onAdd = () => {
        reactHookForm.reset(defaultValues);
        void scheduleNotificationAsync({
            content: {
                title: 'Awsome!',
                body: 'Your message was sent to the seller',
            },
            trigger: { seconds: 1 },
        });
    };

    const addMessage = useAddMessage({ onAdd });

    const onSubmit = (data: FormInput) => {
        Keyboard.dismiss();
        addMessage.mutate({ listingId, message: data.message });
    };

    if (addMessage.isError) {
        return (
            <ErrorFallBack
                error={addMessage.error}
                buttonTitle="Close"
                visible={addMessage.isError}
                onPress={() => addMessage.reset()}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FormProvider {...reactHookForm}>
                <AppFormTextIputField
                    name="message"
                    textInputProps={{
                        placeholder: 'Message to Seller',
                        multiline: true,
                        numberOfLines: 3,
                        maxLength: 255,
                    }}
                />
                <AppFormSubmit
                    disabled={addMessage.isLoading}
                    title={addMessage.isLoading ? 'Sending...' : 'Send'}
                    color={COLORS.primary}
                    onSubmit={reactHookForm.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </View>
    );
};

export default ContactSellerForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
