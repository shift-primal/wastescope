import { createFileRoute } from '@tanstack/react-router';
import { processTransactions, type Bank } from 'txcategorizer';
import { db } from '#/db';
import { transactions } from '#/db/schema';
import { sql } from 'drizzle-orm';

export const Route = createFileRoute('/api/transactions')({
    server: {
        handlers: {
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
