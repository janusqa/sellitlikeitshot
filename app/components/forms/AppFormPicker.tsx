import { type ViewStyle } from 'react-native';

import {
    useFormContext,
    type FieldValues,
    type UseControllerProps,
    Controller,
} from 'react-hook-form';

import AppPicker, { type Item } from '../AppPicker';
import { type Props as PickerItemProps } from '../AppPickerItem';
import ErrorMessage from '../ErrorMessage';
import { type IconProps } from '../IconButton';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    icon?: IconProps['name'];
    placeholder: string;
    style?: ViewStyle;
    items: Item[];
    numColumns?: number;
    renderPickerItemComponent: (
        settings: PickerItemProps
    ) => React.ReactElement<PickerItemProps>;
}

const AppFormPicker = <T extends FieldValues>({
    name,
    renderPickerItemComponent,
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
                        renderPickerItemComponent={renderPickerItemComponent}
                        selectedItem={value}
                        onSelectItem={(item) => {
                            setValue(name, item);
                        }}
                    />
                )}
            />
            <ErrorMessage message={errors[name] && 'Invalid selection'} />
        </>
    );
};

export default AppFormPicker;
