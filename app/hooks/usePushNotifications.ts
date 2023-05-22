import { useMutation } from '@tanstack/react-query';

import PushNotificationService, {
    type PushNotificationToken,
} from '../services/PushNotificationService';
import { useConfigStore } from '../store/configStore';

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
            useConfigStore
                .getState()
                .logger?.info(
                    'Mutation: Push notification token registered for user'
                );
        },

        onError: (error) => {
            // TODO: handle error
            useConfigStore.getState().logger?.error(error);
        },
    });
    return { savePushNotificationMutation };
};

export default usePushNotifications;
