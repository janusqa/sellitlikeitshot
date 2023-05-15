import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const useRefreshOnFocusScreen = <T>(refetch: () => Promise<T>) => {
    const firstTimeRef = useRef<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            void refetch();
        }, [refetch])
    );
};

export default useRefreshOnFocusScreen;
