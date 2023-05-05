import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ZodSchema } from 'zod';

interface Props {
    schema: ZodSchema;
    children: React.ReactNode;
}

const AppForm = ({ schema, children }: Props) => {
    const reactHookForm = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    return <FormProvider {...reactHookForm}>{children}</FormProvider>;
};

export default AppForm;
