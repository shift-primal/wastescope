import { and, asc, between, count, desc, inArray, ilike } from 'drizzle-orm';
import { transactions } from './schema';
import { db } from './index.ts';
export type { TransactionQuery } from '#/types/transactions';
export { SORT_FIELDS } from '#/types/transactions';
import type { TransactionQuery } from '#/types/transactions';

export async function getTransactions(query: TransactionQuery = {}) {
    const conditions = [];

    if (query.category?.length) conditions.push(inArray(transactions.category, query.category));

    if (query.minAmt && query.maxAmt)
        conditions.push(between(transactions.amount, query.minAmt, query.maxAmt));

    if (query.from && query.to) conditions.push(between(transactions.date, query.from, query.to));

    if (query.merchant) conditions.push(ilike(transactions.merchant, `%${query.merchant}%`));

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 25;

    const orderCol = query.sortBy ? transactions[query.sortBy] : transactions.date;
    const orderDir = query.sortDir === 'asc' ? asc(orderCol) : desc(orderCol);

    const where = and(...conditions);

    const [data, [{ totalResults }]] = await Promise.all([
        db
            .select()
            .from(transactions)
            .where(where)
            .orderBy(orderDir)
            .limit(pageSize)
            .offset((page - 1) * pageSize),
        db.select({ totalResults: count() }).from(transactions).where(where),
    ]);

    return { data, totalResults };
}
