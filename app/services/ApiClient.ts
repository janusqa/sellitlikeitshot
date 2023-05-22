import apiUnprotected, {
    apiProtected,
    type AxiosInstance,
    type AxiosRequestConfig,
} from './api';

export interface ApiErrorResponse {
    error: string;
}

// we have placed generic T in class declaration
// so we do not have to repeate it on each class method
class ApiClient<TDataOut, TDataIn> {
    private readonly endpoint;
    private readonly api;

    constructor(endpoint: string, api: AxiosInstance) {
        this.api = api;
        this.endpoint = endpoint;
    }

    getAll(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();
        const response = this.api.request<TDataOut[]>({
            url: this.endpoint,
            signal: controller.signal,
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }

    get(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();
        const response = this.api.request<TDataOut>({
            url: 'this.endpoint',
            signal: controller.signal,
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }

    post(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();

        const response = this.api.request<TDataOut>({
            signal: controller.signal,
            url: this.endpoint,
            method: 'POST',
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }

    put(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();

        const response = this.api.request<TDataOut>({
            signal: controller.signal,
            url: this.endpoint,
            method: 'PUT',
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }

    patch(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();

        const response = this.api.request<TDataOut>({
            signal: controller.signal,
            url: this.endpoint,
            method: 'PATCH',
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }

    delete(config: AxiosRequestConfig<TDataIn> = {}) {
        const controller = new AbortController();

        const response = this.api.request<TDataOut>({
            signal: controller.signal,
            url: this.endpoint,
            method: 'DELETE',
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort(),
        };
    }
}

const create = <TDataOut, TDataIn = TDataOut>(
    endpoint: string,
    isProtected = false
) =>
    new ApiClient<TDataOut, TDataIn>(
        endpoint,
        isProtected ? apiProtected : apiUnprotected
    );

export default create;
