import { client } from '#/services/apiclient';
import { useMutation } from '@tanstack/react-query';

export const useClearDb = () => {
    return useMutation({
        mutationFn: () => {
            return client.delete('/api/transactions');
        },
    });
};
