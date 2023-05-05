import { type ColorValue } from 'react-native';

import { type FieldValues, useFormContext } from 'react-hook-form';

import AppButton from '../AppButton';

interface Props {
    title: string;
    color: ColorValue;
    onSubmit: (data: FieldValues) => void;
}

const AppFormSubmit = ({ title, color, onSubmit }: Props) => {
    const { handleSubmit } = useFormContext();

    return (
        <AppButton
            title={title}
            color={color}
            onPress={handleSubmit(onSubmit)}
        />
    );
};

export default AppFormSubmit;
