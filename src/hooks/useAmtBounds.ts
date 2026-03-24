import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useAmtBounds = () => {
    return useQuery({
        queryKey: ['transactions', 'range'],
        queryFn: () =>
            client
                .get<{
                    minBound: number | 0;
                    maxBound: number | 0;
                }>('/api/transactions/amtbounds')
                .then((r) => r.data ?? { minBound: 0, maxBound: 0 }),
    });
};
