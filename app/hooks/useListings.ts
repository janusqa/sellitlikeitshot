import { useQuery } from '@tanstack/react-query';

import ListingService, {
    type Listing,
    CACHE_KEY_LISTINGS,
} from '../services/ListingService';

const useListings = () => {
    return useQuery<Listing[], Error>({
        queryKey: [CACHE_KEY_LISTINGS],
        queryFn: ListingService.getAll().request,
        staleTime: 1000 * 60 * 60 * 1, // 1h / ms * s * m * h where 1000ms = 1s
    });
};

export default useListings;
