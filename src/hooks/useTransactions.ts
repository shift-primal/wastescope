import type { TransactionQuery } from '#/db/txQueries';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from 'txcategorizer';

export const useTransactions = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', query],
        queryFn: () =>
            client.get<Transaction[]>('/api/transactions', { params: query }).then((r) => r.data),
    });
};
