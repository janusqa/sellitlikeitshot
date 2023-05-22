import create from './ApiClient';

import { type Credentials } from './AuthService';

export interface RegistrationInfo extends Credentials {
    name: string;
}

export interface User {
    userId: number;
    email: string;
    name: string;
}

export const CACHE_KEY_USERS = 'users';
export const ENDPOINT_USERS = '/users';

export default create<string, Credentials>(ENDPOINT_USERS);
