import type { TransactionQuery } from '#/types/transactions';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useMonthlyStats = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', 'by-month', query],
        queryFn: () =>
            client
                .get<{
                    month: string;
                    total: number;
                }>('/api/transactions/stats/by-month', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
    });
};
