import { client } from '#/services/apiclient';
import { useMutation } from '@tanstack/react-query';
import type { Bank } from 'txcategorizer';

export const useAddTransaction = () => {
    return useMutation({
        mutationFn: ({ file, bank, userName }: { file: File; bank: Bank; userName: string }) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bank', bank);
            formData.append('userName', userName);
            console.log('FormData from hook: ', formData);
            return client.post('/api/transactions', formData);
        },
    });
};
