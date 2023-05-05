import { type TextInputProps, type ViewStyle } from 'react-native';

import { type MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Controller,
    useFormContext,
    type FieldValues,
    type UseControllerProps,
} from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';
import AppTextInput from '../AppTextInput';

export type IonIconName = React.ComponentProps<
    typeof MaterialCommunityIcons
>['name'];

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    icon?: IonIconName;
    style?: ViewStyle;
    textInputProps?: TextInputProps;
}

const AppFormField = <T extends FieldValues>({
    name,
    icon,
    style,
    textInputProps,
}: Props<T>) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur } }) => (
                    <AppTextInput
                        icon={icon}
                        style={style}
                        textInputProps={{
                            ...textInputProps,
                            value: value,
                            onChangeText: onChange,
                            onBlur: onBlur,
                        }}
                    />
                )}
            />
            <ErrorMessage message={errors[name]?.message?.toString()} />
        </>
    );
};

export default AppFormField;
