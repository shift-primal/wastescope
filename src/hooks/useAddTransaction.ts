import { client } from '#/services/apiclient';
import { useMutation } from '@tanstack/react-query';
import type { Bank } from 'txcategorizer';

export const useAddTransaction = () => {
    return useMutation({
        mutationFn: ({ file, bank, user }: { file: File; bank: Bank; user: string }) => {
            const formData = new FormData();

            formData.append('file', file);
            formData.append('bank', bank);
            formData.append('user', user);

            return client.post('/api/transactions', formData);
        },
    });
};
