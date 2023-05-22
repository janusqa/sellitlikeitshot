import { useMutation } from '@tanstack/react-query';

import AuthService, { type Credentials } from '../services/AuthService';
import { useAuthActions } from '../store/authStore';
import { useConfigStore } from '../store/configStore';

const useAuth = () => {
    const login = useAuthActions().login;

    const loginMutation = useMutation<string, Error, Credentials>({
        mutationFn: (credentials) =>
            AuthService.post({ data: credentials }).request(),

        onSuccess: (data) => {
            login(data);
        },

        onError: (error) => {
            // TODO: handle error
            useConfigStore.getState().logger?.error(error);
        },
    });

    return { loginMutation };
};

export default useAuth;
