import { createFileRoute } from '@tanstack/react-router';
import { getUsers } from '#/db/txQueries';

export const Route = createFileRoute('/api/transactions/users')({
    server: {
        handlers: {
            GET: async () => Response.json(await getUsers()),
        },
    },
});
