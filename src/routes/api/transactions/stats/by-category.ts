import { getCategoryStats } from '#/db/txQueries';
import { parseTransactionQuery } from '#/lib/parseQuery';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/transactions/stats/by-category')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const query = parseTransactionQuery(new URL(request.url));

                return Response.json(await getCategoryStats(query));
            },
        },
    },
});
