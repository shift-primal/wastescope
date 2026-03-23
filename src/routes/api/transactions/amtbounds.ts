import { createFileRoute } from '@tanstack/react-router';
import { db } from '#/db';
import { transactions } from '#/db/schema';
import { max, min } from 'drizzle-orm';

export const Route = createFileRoute('/api/transactions/amtbounds')({
    server: {
        handlers: {
            GET: async () => {
                const bounds = await db
                    .select({
                        minBound: min(transactions.amount),
                        maxBound: max(transactions.amount),
                    })
                    .from(transactions);

                return Response.json(bounds);
            },
        },
    },
});
