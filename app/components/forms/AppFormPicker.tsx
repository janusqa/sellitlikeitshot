import { type ViewStyle } from 'react-native';

import { type MaterialCommunityIcons } from '@expo/vector-icons';
import {
    useFormContext,
    type FieldValues,
    type UseControllerProps,
    Controller,
} from 'react-hook-form';

import AppPicker from '../AppPicker';
import ErrorMessage from '../ErrorMessage';

export type IonIconName = React.ComponentProps<
    typeof MaterialCommunityIcons
>['name'];

interface Props<T extends FieldValues & { label: string }>
    extends UseControllerProps<T> {
    icon?: IonIconName;
    placeholder: string;
    style?: ViewStyle;
    items: T[];
}

const AppFormPicker = <T extends FieldValues & { label: string }>({
    name,
    ...otherProps
}: Props<T>) => {
    const {
        setValue,
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { value } }) => (
                    <AppPicker
                        {...otherProps}
                        selectedItem={value}
                        onSelectItem={(item) => setValue(name, value)}
                    />
                )}
            />
            <ErrorMessage message={errors[name]?.message?.toString()} />
        </>
    );
};

export default AppFormPicker;
