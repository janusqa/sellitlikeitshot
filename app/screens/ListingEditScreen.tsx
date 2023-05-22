import { StyleSheet, ScrollView, View } from 'react-native';
import { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import COLORS from '../constants/colors';
import {
    AppFormPicker,
    AppFormSubmit,
    AppFormTextIputField,
} from '../components/forms';
import IconButton from '../components/IconButton';
import { type Item } from '../components/AppPicker';
import AppPickerItemCategory from '../components/AppPickerItemCategory';
import AppFormImagePicker from '../components/forms/AppFormImagePicker';
import useLocation from '../hooks/useLocation';
import { type AppNavScreenProps } from '../navigation/navigation';
import useAddListing from '../hooks/useAddListing';
import IndicatorLoading from '../components/IndicatorLoading';
import ErrorFallBack from '../components/ErrorFallback';

const items: Item[] = [
    {
        color: '#fc5c65',
        icon: 'floor-lamp',
        label: 'Furniture',
        value: 1,
    },
    {
        color: '#fd9644',
        icon: 'car',
        label: 'Cars',
        value: 2,
    },
    {
        color: '#fed330',
        icon: 'camera',
        label: 'Cameras',
        value: 3,
    },
    {
        color: '#26de81',
        icon: 'cards',
        label: 'Games',
        value: 4,
    },
    {
        color: '#2bcbba',
        icon: 'shoe-heel',
        label: 'Clothing',
        value: 5,
    },
    {
        color: '#45aaf2',
        icon: 'basketball',
        label: 'Sports',
        value: 6,
    },
    {
        color: '#4b7bec',
        icon: 'headphones',
        label: 'Movies & Music',
        value: 7,
    },
    {
        color: '#a55eea',
        icon: 'book-open-variant',
        label: 'Books',
        value: 8,
    },
    {
        color: '#778ca3',
        icon: 'application',
        label: 'Other',
        value: 9,
    },
];

type CATEGORY = (typeof items)[number]['label'];
const categories: [CATEGORY, ...CATEGORY[]] = [
    items[0].label,
    ...items.filter((item, idx) => idx !== 0).map((item) => item.label),
];

const FormInput = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(1, { message: 'Title is required' }),
    price: z.coerce
        .number({
            required_error: 'Price is required',
            invalid_type_error: 'Price field is a required',
        })
        .min(1, { message: 'Price must be greater than 0' })
        .max(10000, { message: 'Price must be less than 10000' }),
    // price: z.preprocess((arg) => {
    //     const processed = z.string().transform(Number).safeParse(arg);
    //     return processed.success ? processed.data : arg;
    // }, z.number({ required_error: 'Price is required', invalid_type_error: 'Price field is a required' }).min(1, { message: 'Price must be greater than 0' }).max(10000, { message: 'Price must be less than 10000' })),
    description: z.string().optional(),
    category: z.object({
        label: z.enum(categories),
        value: z.number(),
        color: z.string().optional(),
        icon: z.string().optional(),
    }),
    images: z.array(z.string()).nonempty({ message: 'Please select an image' }),
});

const Location = z.object(
    {
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    },
    { required_error: 'Could not determine your location' }
);

export type FormInput = z.infer<typeof FormInput>;
export type LocationInput = z.infer<typeof Location>;

const defaultValues = {
    title: '',
    description: '',
    category: { label: 'Category', value: 0, color: '', icon: '' },
    images: [] as string[],
};

const ListingEditScreen = ({ route }: AppNavScreenProps<'ListingEdit'>) => {
    const [progress, setProgress] = useState<number>(0);
    const [complete, setComplete] = useState<boolean>(true);
    const userLocation = useLocation();

    const style = route.params?.style;

    const reactHookForm = useForm<FormInput>({
        resolver: zodResolver(FormInput),
        defaultValues,
    });

    const onAdd = () => {
        setProgress(0);
        reactHookForm.reset(defaultValues);
    };
    const onProgress = (progress: number) => setProgress(progress);
    const onComplete = () => setComplete(true);

    const addListing = useAddListing({ onAdd, onProgress });

    const onSubmit = (data: FormInput) => {
        const listing = new FormData();
        listing.append('title', data.title);
        listing.append('price', data.price.toString());
        listing.append('categoryId', data.category.value.toString());
        listing.append('description', data.description ?? '');
        data.images.forEach((imageUri) => {
            listing.append('images', {
                name: imageUri.split('/').pop(),
                type: 'image/jpeg',
                uri: imageUri,
            } as unknown as File);
        });
        const geoLocation = Location.safeParse(userLocation);
        if (geoLocation.success)
            listing.append('location', JSON.stringify(geoLocation.data));

        setComplete(false);
        addListing.mutate(listing);
    };

    if (addListing.isError) {
        return (
            <ErrorFallBack
                error={addListing.error}
                buttonTitle="Close"
                visible={addListing.isError}
                onPress={() => {
                    setComplete(true);
                    addListing.reset();
                }}
            />
        );
    }

    if (!complete)
        return (
            <IndicatorLoading
                progress={progress}
                visible={!complete}
                onComplete={onComplete}
            />
        );

    return (
        <View style={styles.container}>
            <ScrollView style={[!!style && style]}>
                <FormProvider {...reactHookForm}>
                    <AppFormImagePicker name="images" />
                    <AppFormTextIputField
                        name="title"
                        textInputProps={{
                            placeholder: 'Title',
                            maxLength: 255,
                        }}
                    />
                    <AppFormTextIputField
                        name="price"
                        textInputProps={{
                            placeholder: 'Price',
                            maxLength: 8,
                            keyboardType: 'numeric',
                        }}
                    />
                    <AppFormPicker
                        name="category"
                        items={items}
                        placeholder="Category"
                        numColumns={3}
                        renderPickerItemComponent={(pickerSettings) => (
                            <AppPickerItemCategory
                                {...pickerSettings}
                                renderIcon={(iconSettings) => (
                                    <IconButton
                                        {...iconSettings}
                                        name={
                                            pickerSettings.icon?.name ?? 'blank'
                                        }
                                        color={pickerSettings.icon?.color}
                                        size={50}
                                        onPress={pickerSettings.onPress}
                                    />
                                )}
                            />
                        )}
                    />
                    <AppFormTextIputField
                        name="description"
                        textInputProps={{
                            placeholder: 'Description',
                            multiline: true,
                            numberOfLines: 3,
                            maxLength: 255,
                        }}
                    />
                    <AppFormSubmit
                        disabled={addListing.isLoading}
                        title={addListing.isLoading ? 'Posting...' : 'Post'}
                        color={COLORS.primary}
                        onSubmit={reactHookForm.handleSubmit(onSubmit)}
                    />
                </FormProvider>
            </ScrollView>
        </View>
    );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
