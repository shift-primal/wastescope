import type { User } from '#/db/schema';
import { client } from '#/services/apiclient';
import { useQuery } from '@tanstack/react-query';

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => client.get<User[]>('/api/users').then((r) => r.data ?? []),
    });
};
