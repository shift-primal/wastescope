import type { TransactionQuery, TransactionResult } from '#/types/transactions';
import { client } from '#/lib/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', query],
        queryFn: () =>
            client
                .get<TransactionResult>('/api/transactions', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
    });
};
