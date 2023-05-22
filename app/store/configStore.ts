import { create } from 'zustand';
import { produce } from 'immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { type LoggerClientType } from '../services/LoggerClient';

interface ConfigStore {
    logger: LoggerClientType | undefined;
    actions: {
        setLogger: (logger: LoggerClientType) => void;
    };
}

export const useConfigStore = create<ConfigStore>((set) => ({
    logger: undefined,
    actions: {
        setLogger: (logger) => {
            set((state) => {
                const nextState = produce(state, (draft) => {
                    draft.logger = logger;
                });
                return nextState;
            });
        },
    },
}));

export const useLogger = () => useConfigStore((state) => state.logger);
export const useConfigActions = () => useConfigStore((state) => state.actions);

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('ConfigStore', useConfigStore);
}
