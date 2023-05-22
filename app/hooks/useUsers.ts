import { useMutation } from '@tanstack/react-query';

import UserService, { type RegistrationInfo } from '../services/UserService';
import { useAuthActions } from '../store/authStore';

const useUsers = () => {
    const login = useAuthActions().login;

    const registerMutation = useMutation<string, Error, RegistrationInfo>({
        mutationFn: (registrationInfo) =>
            UserService.post({ data: registrationInfo }).request(),

        onSuccess: (data) => {
            login(data);
        },

        onError: (error) => {
            // TODO: handle error
            console.log('Mutation: ', error.message);
        },
    });

    return { registerMutation };
};

export default useUsers;
