import Constants from 'expo-constants';

import { env } from './env';

const settings = {
    dev: {
        apiUrl: env.DEV_APP_API_BASE_URL,
    },
    staging: {
        apiUrl: env.DEV_APP_API_BASE_URL,
    },
    prod: {
        apiUrl: env.DEV_APP_API_BASE_URL,
    },
};

const getCurrentSettings = () => {
    if (__DEV__) return settings.dev;
    if (Constants.manifest?.releaseChannel === 'staging')
        return settings.staging;
    return settings.prod;
};

export default getCurrentSettings();
