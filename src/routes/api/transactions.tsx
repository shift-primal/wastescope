import { createFileRoute } from '@tanstack/react-router';
import { processTransactions, type Bank, type Category } from 'txcategorizer';
import { db } from '#/db';
import { transactions } from '#/db/schema';
import { sql } from 'drizzle-orm';
import { getTransactions, type TransactionQuery } from '#/db/txQueries';

export const Route = createFileRoute('/api/transactions')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const url = new URL(request.url);

                const query = {
                    category: url.searchParams.getAll('category') as Category[],
                    merchant: url.searchParams.get('merchant') ?? undefined,
                    from: url.searchParams.get('from') ?? undefined,
                    to: url.searchParams.get('to') ?? undefined,
                    sortBy:
                        (url.searchParams.get('sortBy') as TransactionQuery['sortBy']) ?? undefined,
                    sortDir:
                        (url.searchParams.get('sortDir') as TransactionQuery['sortDir']) ??
                        undefined,
                    page: url.searchParams.get('page')
                        ? Number(url.searchParams.get('page'))
                        : undefined,
                    pageSize: url.searchParams.get('pageSize')
                        ? Number(url.searchParams.get('pageSize'))
                        : undefined,
                };

                const txs = await getTransactions(query);
                return Response.json(txs);
            },

            POST: async ({ request }) => {
                const formData = await request.formData();

                const file = formData.get('file') as File;
                const buffer = await file.arrayBuffer();

                const bank = formData.get('bank') as Bank;

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
