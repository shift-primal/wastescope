import { client } from '#/services/apiclient';
import { useMutation } from '@tanstack/react-query';
import type { Bank } from 'txcategorizer';

export const useAddTransaction = () => {
    return useMutation({
        mutationFn: ({ file, bank }: { file: File; bank: Bank }) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bank', bank);
            console.log('FormData from hook: ', formData);
            return client.post('/api/transactions', formData);
        },
    });
};
