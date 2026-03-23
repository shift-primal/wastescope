import type { TransactionQuery } from '#/types/transactions';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from 'txcategorizer';

export const useTransactions = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', query],
        queryFn: () =>
            client
                .get<{
                    data: Transaction[];
                    totalResults: number;
                }>('/api/transactions', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
    });
};
