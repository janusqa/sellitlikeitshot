import { useMutation } from '@tanstack/react-query';

import PushNotificationService, {
    type PushNotificationToken,
} from '../services/PushNotificationService';

const usePushNotifications = () => {
    const savePushNotificationMutation = useMutation<
        void,
        Error,
        PushNotificationToken
    >({
        mutationFn: (pushNotificationToken) =>
            PushNotificationService.post({
                data: pushNotificationToken,
            }).request(),

        onSuccess: () => {
            console.log(
                'Mutation: ',
                'Push notification token registered for user'
            );
        },

        onError: (error) => {
            // TODO: handle error
            console.log('Mutation: ', error.message);
        },
    });
    return { savePushNotificationMutation };
};

export default usePushNotifications;
