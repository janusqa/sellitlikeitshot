import create from './ApiClient';

export interface Message {
    listingId: number;
    message: string;
}

export const CACHE_KEY_MESSAGES = 'messages';
export const ENDPOINT_MESSAGES = '/messages';

export default create<Message>(ENDPOINT_MESSAGES, true);
