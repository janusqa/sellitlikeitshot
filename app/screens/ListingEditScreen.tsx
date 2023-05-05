import { z } from 'zod';
import { type FieldValues } from 'react-hook-form';

import logo from '../assets/logo-red.png';
import COLORS from '../constants/colors';
import { AppFormPicker, AppForm } from '../components/forms';
import App from '../../App';

const categories = ['Furniture', 'Cars', 'Electronics '] as const;

const zFormData = z.object({
    category: z.enum(categories).optional(),
});

const items = [
    {
        label: 'Furniture',
        value: 1,
    },
    { label: 'Cars', value: 2 },
    { label: 'Electronics', value: 3 },
];

export type FormData = z.infer<typeof zFormData>;

const ListingEditScreen = () => {
    return (
        <AppForm schema={zFormData}>
            <AppFormPicker
                name="category"
                icon="apps"
                items={items}
                placeholder="Category"
            />
        </AppForm>
    );
};

export default ListingEditScreen;
