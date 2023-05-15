import create from './ApiClient';

export interface Listing {
    id: number;
    title: string;
    images: {
        url: string;
        thumbnailUrl: string;
    }[];
    price: number;
    categoryId: number;
    userId: number;
    location?: {
        latitude: number;
        longitude: number;
    };
}

export const CACHE_KEY_LISTINGS = 'listings';
export const ENDPOINT_LISTINGS = '/listings';

export default create<Listing, FormData>(ENDPOINT_LISTINGS);
