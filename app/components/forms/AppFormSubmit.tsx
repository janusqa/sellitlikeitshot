import { type ColorValue } from 'react-native';

import AppButton from '../AppButton';

interface Props {
    title: string;
    color: ColorValue;
    onSubmit: () => void;
    disabled?: boolean;
}

const AppFormSubmit = ({ title, color, onSubmit, disabled = false }: Props) => {
    return (
        <AppButton
            title={title}
            color={color}
            onPress={onSubmit}
            disabled={disabled}
        />
    );
};

export default AppFormSubmit;
