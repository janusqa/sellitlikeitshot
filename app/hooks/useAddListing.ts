import { useMutation, useQueryClient } from '@tanstack/react-query';
import ListingService, {
    type Listing,
    CACHE_KEY_LISTINGS,
} from '../services/ListingService';
import { type LocationInput } from '../screens/ListingEditScreen';

interface AddListingContext {
    previousListings: Listing[];
    optimisticListing: Listing;
}

const useAddListing = (callbacks: {
    onAdd: () => void;
    onProgress: (progress: number) => void;
}) => {
    const queryClient = useQueryClient();

    const formDataToListing = (formData: FormData) => {
        const geoLocation = formData.getAll('location')[0] as string;
        const listing = {
            id: 0,
            title: formData.getAll('title')[0] as string,
            description: formData.getAll('description')[0] as string,
            price: Number(formData.getAll('price')[0] as string),
            categoryId: Number(formData.getAll('categoryId')[0] as string),
            images: (
                formData.getAll('images') as unknown as {
                    name: string;
                    type: string;
                    uri: string;
                }[]
            ).map((image) => ({ url: image.uri, thumbnailUrl: '' })),
            userId: 0,
            location: !!geoLocation
                ? (JSON.parse(
                      formData.getAll('location')[0] as string
                  ) as LocationInput)
                : undefined,
        };
        return listing;
    };

    return useMutation<Listing, Error, FormData, AddListingContext>({
        mutationFn: (listing) =>
            ListingService.post({
                data: listing,
                headers: { 'Content-Type': 'multipart/form-data' },
                maxRedirects: 0,
                onUploadProgress: ({ progress }) => {
                    progress
                        ? callbacks.onProgress(progress)
                        : callbacks.onProgress(0);
                },
            }).request(),

        onMutate: (newListing) => {
            const previousListings =
                queryClient.getQueryData<Listing[]>([CACHE_KEY_LISTINGS]) ?? [];

            const optimisticListing = formDataToListing(newListing);

            queryClient.setQueryData<Listing[]>(
                [CACHE_KEY_LISTINGS],
                (listings = []) => [...listings, optimisticListing]
            );

            callbacks.onAdd();

            return { previousListings, optimisticListing };
        },

        onSuccess: (savedListing, newListings, context) => {
            if (!context) return;
            queryClient.setQueryData<Listing[]>(
                [CACHE_KEY_LISTINGS],
                (listings) =>
                    listings?.map((listing) =>
                        listing === context.optimisticListing
                            ? savedListing
                            : listing
                    )
            );
        },

        onError: (error, newListing, context) => {
            if (!context) return;
            queryClient.setQueryData<Listing[]>(
                [CACHE_KEY_LISTINGS],
                context.previousListings
            );
        },
    });
};

export default useAddListing;
