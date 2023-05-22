import { useMutation } from '@tanstack/react-query';

import AuthService, { type Credentials } from '../services/AuthService';
import { useAuthActions } from '../store/authStore';

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
            console.log('Callback: ', error.message);
        },
    });

    return { loginMutation };
};

export default useAuth;
