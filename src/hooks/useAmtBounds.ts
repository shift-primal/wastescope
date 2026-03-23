import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useAmtBounds = () => {
    return useQuery({
        queryKey: ['transactions', 'range'],
        queryFn: () =>
            client
                .get<
                    {
                        minBound: string | null;
                        maxBound: string | null;
                    }[]
                >('/api/transactions/amtbounds')
                .then((r) => r.data[0]),
    });
};
