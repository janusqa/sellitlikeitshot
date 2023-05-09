import {
    Controller,
    useFormContext,
    type FieldValues,
    type UseControllerProps,
} from 'react-hook-form';
import ImageInputList from '../ImageInputList';
import ErrorMessage from '../ErrorMessage';

type Props<T extends FieldValues> = UseControllerProps<T>;

const AppFormImagePicker = <T extends FieldValues>({ name }: Props<T>) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                    <ImageInputList
                        imageUris={value}
                        onAddImage={(imageUri) => {
                            if (imageUri) onChange([...value, imageUri]);
                        }}
                        onRemoveImage={(imageUri) => {
                            if (imageUri) {
                                onChange(
                                    (value as (typeof imageUri)[]).filter(
                                        (uri) => uri !== imageUri
                                    )
                                );
                            }
                        }}
                    />
                )}
            />
            <ErrorMessage message={errors[name]?.message?.toString()} />
        </>
    );
};

export default AppFormImagePicker;
