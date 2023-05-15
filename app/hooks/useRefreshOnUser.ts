import { useState } from 'react';

const useRefreshOnUser = <T>(refetch: () => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false);

    async function refreshByUser() {
        setIsLoading(true);

        try {
            await refetch();
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        refreshByUser,
    };
};

export default useRefreshOnUser;
