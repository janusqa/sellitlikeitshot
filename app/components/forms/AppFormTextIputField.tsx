import { type TextInputProps, type ViewStyle } from 'react-native';

import {
    Controller,
    useFormContext,
    type FieldValues,
    type UseControllerProps,
} from 'react-hook-form';

import ErrorMessage from '../ErrorMessage';
import AppTextInput from '../AppTextInput';
import { type IconProps } from '../IconButton';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    icon?: IconProps['name'];
    style?: ViewStyle;
    textInputProps?: TextInputProps;
}

const AppFormTextInputField = <T extends FieldValues>({
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
                render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                }) => (
                    <AppTextInput
                        icon={icon}
                        style={
                            !!error
                                ? { ...style, backgroundColor: 'pink' }
                                : style
                        }
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

export default AppFormTextInputField;
