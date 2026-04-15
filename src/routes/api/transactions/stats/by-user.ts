import { getUserStats } from '#/db/txQueries';
import { createFileRoute } from '@tanstack/react-router';
import type { Category } from 'txcategorizer';

export const Route = createFileRoute('/api/transactions/stats/by-user')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const url = new URL(request.url);

                const query = {
                    user: url.searchParams.getAll('user') as string[],
                    category: url.searchParams.getAll('category') as Category[],
                    merchant: url.searchParams.get('merchant') ?? undefined,
                    minAmt: url.searchParams.get('minAmt') ? Number(url.searchParams.get('minAmt')) : undefined,
                    maxAmt: url.searchParams.get('maxAmt') ? Number(url.searchParams.get('maxAmt')) : undefined,
                    from: url.searchParams.get('from') ?? undefined,
                    to: url.searchParams.get('to') ?? undefined,
                };

                return Response.json(await getUserStats(query));
            },
        },
    },
});
