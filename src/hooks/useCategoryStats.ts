import type { TransactionQuery, CategoryStat } from '#/types/transactions';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useCategoryStats = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', 'by-category', query],
        queryFn: () =>
            client
                .get<CategoryStat[]>('/api/transactions/stats/by-category', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
    });
};
