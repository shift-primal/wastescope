import type { TransactionQuery, UserStat } from '#/types/transactions';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useUserStats = (query?: TransactionQuery, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['transactions', 'by-user', query],
        queryFn: () =>
            client
                .get<UserStat[]>('/api/transactions/stats/by-user', { params: query })
                .then((r) => r.data),
        placeholderData: (prev) => prev,
        enabled: options?.enabled ?? true,
    });
};
