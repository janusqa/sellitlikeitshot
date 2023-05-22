import { useMutation } from '@tanstack/react-query';
import MessageService, { type Message } from '../services/MessageService';

const useAddMessage = (callbacks: { onAdd: () => void }) => {
    return useMutation<Message, Error, Message>({
        mutationFn: (message) =>
            MessageService.post({
                data: message,
            }).request(),

        onSuccess: () => {
            callbacks.onAdd();
            console.log('Mutation: ', 'Message successfully sent to seller');
        },

        onError: (error) => {
            // TODO: handle error
            console.log('Mutation: ', error.message);
        },
    });
};

export default useAddMessage;
