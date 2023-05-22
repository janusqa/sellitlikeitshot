import create from './ApiClient';

export interface Credentials {
    email: string;
    password: string;
}

export const CACHE_KEY_AUTH = 'auth';
export const ENDPOINT_AUTH = '/auth';

export default create<string, Credentials>(ENDPOINT_AUTH);
