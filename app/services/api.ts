import axios, {
    CanceledError,
    type AxiosRequestConfig,
    type AxiosInstance,
    type AxiosError,
} from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.55:9000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
export { CanceledError, AxiosRequestConfig, AxiosInstance, AxiosError };
