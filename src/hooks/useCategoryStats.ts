import type { TransactionQuery } from '#/types/transactions';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';
import type { Category } from 'txcategorizer';

export const useCategoryStats = (query?: TransactionQuery) => {
    return useQuery({
        queryKey: ['transactions', 'by-category', query],
        queryFn: () =>
            client
                .get<{
                    category: Category;
                    total: number;
                }>('/api/transactions/stats/by-category', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
    });
};
