import { useMutation } from '@tanstack/react-query';
import MessageService, { type Message } from '../services/MessageService';
import { useConfigStore } from '../store/configStore';

const useAddMessage = (callbacks: { onAdd: () => void }) => {
    return useMutation<Message, Error, Message>({
        mutationFn: (message) =>
            MessageService.post({
                data: message,
            }).request(),

        onSuccess: () => {
            callbacks.onAdd();
            useConfigStore
                .getState()
                .logger?.info('Mutation: Message successfully sent to seller');
        },

        onError: (error) => {
            // TODO: handle error
            useConfigStore.getState().logger?.error(error);
        },
    });
};

export default useAddMessage;
