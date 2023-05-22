import { create } from 'zustand';
import { produce } from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import jwtDecode from 'jwt-decode';

import { type User } from '../services/UserService';
import secureStore from '../services/secureStore';

interface AuthStore {
    user: User | undefined;
    accessToken: string | undefined;
    actions: {
        login: (accessToken: string) => void;
        logout: () => void;
    };
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: undefined,
    accessToken: undefined,
    actions: {
        login: (accessToken) => {
            const user = jwtDecode<User>(accessToken);
            void secureStore.put('accessToken', accessToken);
            set((state) => {
                const nextState = produce(state, (draft) => {
                    draft.user = user;
                    draft.accessToken = accessToken;
                });
                return nextState;
            });
        },
        logout: () => {
            void secureStore.remove('accessToken');
            set((state) => {
                const nextState = produce(state, (draft) => {
                    draft.user = undefined;
                    draft.accessToken = undefined;
                });
                return nextState;
            });
        },
    },
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useAuthActions = () => useAuthStore((state) => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('AuthStore', useAuthStore);
}
