import type { User } from '#/db/schema';
import { client } from '#/services/apiclient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ user }: { user: User }) =>
            client.post('/api/users', { name: user.name, color: user.color }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};
