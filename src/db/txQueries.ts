import { and, asc, between, desc, eq, like } from 'drizzle-orm';
import { transactions } from './schema';
import type { Category } from 'txcategorizer';
import { db } from './index.ts';

export type TransactionQuery = {
    // filtering
    category?: Category;
    from?: string;
    to?: string;
    merchant?: string;
    // sorting
    sortBy?: 'date' | 'amount' | 'merchant' | 'category';
    sortDir?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
};

export async function getTransactions(query: TransactionQuery = {}) {
    const conditions = [];

    if (query.category) conditions.push(eq(transactions.category, query.category));
    if (query.from && query.to) conditions.push(between(transactions.date, query.from, query.to));
    if (query.merchant) conditions.push(like(transactions.merchant, `%${query.merchant}%`));

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 25;

    const orderCol = query.sortBy ? transactions[query.sortBy] : transactions.date;
    const orderDir = query.sortDir === 'asc' ? asc(orderCol) : desc(orderCol);

    return db
        .select()
        .from(transactions)
        .where(and(...conditions))
        .orderBy(orderDir)
        .limit(pageSize)
        .offset((page - 1) * pageSize);
}
