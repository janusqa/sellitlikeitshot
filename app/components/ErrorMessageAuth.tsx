import { AxiosError } from '../services/api';

import { type ApiErrorResponse } from '../services/ApiClient';
import ErrorMessage from './ErrorMessage';

interface Props {
    error: unknown;
}

const ErrorMessageAuth = ({ error }: Props) => {
    const message =
        error instanceof AxiosError && error.response
            ? (error.response.data as ApiErrorResponse).error
            : error instanceof Error
            ? error.message
            : 'An error occured';

    return <ErrorMessage message={message} />;
};

export default ErrorMessageAuth;
