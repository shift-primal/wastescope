import type { TransactionQuery, MonthlyStatByUser } from '#/types/transactions';
import { client } from '#/lib/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useMonthlyStatsByUser = (
    query?: TransactionQuery,
    options?: { enabled?: boolean },
) => {
    return useQuery({
        queryKey: ['transactions', 'by-month-user', query],
        queryFn: () =>
            client
                .get<
                    MonthlyStatByUser[]
                >('/api/transactions/stats/by-month-user', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
        enabled: options?.enabled ?? true,
    });
};
