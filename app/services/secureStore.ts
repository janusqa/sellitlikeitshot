import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { useConfigStore } from '../store/configStore';

const put = async (key: string, value: string) => {
    try {
        await setItemAsync(key, value);
    } catch (error) {
        // const message =
        //     error instanceof Error
        //         ? error.message
        //         : 'An error occured while saving data to secure storage';
        useConfigStore.getState().logger?.error(error);
    }
};

const get = async (key: string) => {
    try {
        return await getItemAsync(key);
    } catch (error) {
        // const message =
        //     error instanceof Error
        //         ? error.message
        //         : 'An error occured while getting data from secure storage';
        useConfigStore.getState().logger?.error(error);
    }
};

const remove = async (key: string) => {
    try {
        await deleteItemAsync(key);
    } catch (error) {
        // const message =
        //     error instanceof Error
        //         ? error.message
        //         : 'An error occured while deleting data from secure storage';
        useConfigStore.getState().logger?.error(error);
    }
};

export default {
    put,
    get,
    remove,
};
