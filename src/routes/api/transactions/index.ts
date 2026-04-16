import { createFileRoute } from '@tanstack/react-router';
import { processTransactions, type Bank } from 'txcategorizer';
import { db } from '#/db';
import { transactions } from '#/db/schema';
import { sql } from 'drizzle-orm';
import { getTransactions } from '#/db/txQueries';
import { parseTransactionQuery } from '#/lib/parseQuery';

export const Route = createFileRoute('/api/transactions/')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const query = parseTransactionQuery(new URL(request.url));
                return Response.json(await getTransactions(query));
            },

            POST: async ({ request }) => {
                const formData = await request.formData();

                const file = formData.get('file') as File;
                const buffer = await file.arrayBuffer();

                const bank = formData.get('bank') as Bank;

                const user = formData.get('user') as string;

                const results = processTransactions(buffer, bank);

                await db.insert(transactions).values(
                    results.map((t) => ({
                        date: t.date,
                        amount: t.amount.toString(),
                        merchant: t.merchant,
                        counterparty: t.counterparty,
                        category: t.category,
                        type: t.type ?? 'Annet',
                        currency: t.valuta?.currency,
                        exchangeRate: t.valuta?.exchangeRate?.toString(),
                        user: user,
                    })),
                );

                return Response.json(results);
            },

            DELETE: async () => {
                await db.delete(transactions);
                await db.execute(sql`ALTER SEQUENCE transactions_id_seq RESTART WITH 1`);

                return new Response('ok');
            },
        },
    },
});
