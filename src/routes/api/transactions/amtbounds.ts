import { createFileRoute } from '@tanstack/react-router';
import { getAmtBounds } from '#/db/txQueries';

export const Route = createFileRoute('/api/transactions/amtbounds')({
    server: {
        handlers: {
            GET: async () => Response.json(await getAmtBounds()),
        },
    },
});
