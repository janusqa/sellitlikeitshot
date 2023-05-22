import axios, {
    CanceledError,
    AxiosRequestConfig,
    AxiosInstance,
    AxiosError,
} from 'axios';

import { useAuthStore } from '../store/authStore';

const endpoint = 'http://10.0.0.55:9000/api';

const api = axios.create({
    baseURL: endpoint,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const apiProtected = axios.create({
    baseURL: endpoint,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

apiProtected.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        if (accessToken) config.headers['x-auth-token'] = accessToken;
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

apiProtected.interceptors.response.use(
    (response) => response,
    async (error) => {
        // TODO: if error is a 403 (Forbidden)
        // refresh token if expired and retry request exactly one time.
        return Promise.reject(error);
    }
);

export default api;
export { CanceledError, AxiosRequestConfig, AxiosInstance, AxiosError };
