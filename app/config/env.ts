import { z } from 'zod';

import { REACT_APP_DEV_APP_API_BASE_URL } from '@env';

const client = z.object({
    DEV_APP_API_BASE_URL: z.string().url(),
});

const processEnv: Record<keyof z.infer<typeof client>, string | undefined> = {
    DEV_APP_API_BASE_URL: REACT_APP_DEV_APP_API_BASE_URL,
};

const parsed = client.safeParse(processEnv);

if (parsed.success === false) {
    console.error(
        'Invalid environment variables:',
        parsed.error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
}

const env = new Proxy(parsed.data, {
    get(target, prop) {
        if (typeof prop !== 'string') return undefined;
        return target[prop as keyof typeof target];
    },
});

export { env };
