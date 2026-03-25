import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
    return useQuery({
        queryKey: ['transactions', 'users'],
        queryFn: () => client.get<string[]>('/api/transactions/users').then((r) => r.data ?? []),
    });
};
