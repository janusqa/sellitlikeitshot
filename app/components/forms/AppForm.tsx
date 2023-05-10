import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';
import { type ZodSchema } from 'zod';

interface Props {
    schema: ZodSchema;
    children: React.ReactNode;
    defaultValues?: unknown;
}

const AppForm = ({ schema, children, defaultValues }: Props) => {
    type FormData = z.infer<typeof schema>;
    const reactHookForm = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });
    return <FormProvider {...reactHookForm}>{children}</FormProvider>;
};

export default AppForm;
