import { StyleSheet, View, type ViewStyle } from 'react-native';

import { z } from 'zod';
import { type FieldValues } from 'react-hook-form';

import COLORS from '../constants/colors';
import {
    AppFormPicker,
    AppForm,
    AppFormSubmit,
    AppFormField,
} from '../components/forms';
import IconButton from '../components/IconButton';
import { type Item } from '../components/AppPicker';
import AppPickerItemCategory from '../components/AppPickerItemCategory';

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

const zFormData = z.object({
    title: z.string({ required_error: 'Title is required' }),
    price: z.preprocess((arg) => {
        const processed = z.string().transform(Number).safeParse(arg);
        return processed.success ? processed.data : arg;
    }, z.number({ required_error: 'Price is required', invalid_type_error: 'Price field is a required' }).min(1, { message: 'Price must be greater than 0' }).max(10000, { message: 'Price must be less than 10000' })),

    description: z.string().optional(),
    category: z.object({ label: z.enum(categories), value: z.number() }),
});

export type FormData = z.infer<typeof zFormData>;

interface Props {
    style?: ViewStyle;
}

const ListingEditScreen = ({ style }: Props) => {
    const onSubmit = (data: FieldValues) => console.log(data);
    return (
        <View style={[styles.container, !!style && style]}>
            <AppForm schema={zFormData}>
                <AppFormField
                    name="title"
                    textInputProps={{ placeholder: 'Title', maxLength: 255 }}
                />
                <AppFormField
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
                                    name={pickerSettings.icon?.name ?? 'blank'}
                                    color={pickerSettings.icon?.color}
                                    size={50}
                                    onPress={pickerSettings.onPress}
                                />
                            )}
                        />
                    )}
                />
                <AppFormField
                    name="description"
                    textInputProps={{
                        placeholder: 'Description',
                        multiline: true,
                        numberOfLines: 3,
                        maxLength: 255,
                    }}
                />
                <AppFormSubmit
                    title="Post"
                    color={COLORS.primary}
                    onSubmit={onSubmit}
                />
            </AppForm>
        </View>
    );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
