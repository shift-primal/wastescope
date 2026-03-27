import {
    and,
    asc,
    between,
    count,
    desc,
    inArray,
    ilike,
    min,
    max,
    or,
    sum,
    sql,
} from 'drizzle-orm';
import { transactions } from './schema';
import { db } from './index.ts';
export type { TransactionQuery } from '#/types/transactions';
export { SORT_FIELDS } from '#/types/transactions';
import type { TransactionQuery } from '#/types/transactions';

function buildConditions(query: TransactionQuery = {}) {
    const conditions = [];

    if (query.user?.length) conditions.push(inArray(transactions.user, query.user));
    if (query.category?.length) conditions.push(inArray(transactions.category, query.category));
    if (query.minAmt && query.maxAmt)
        conditions.push(
            between(transactions.amount, query.minAmt.toString(), query.maxAmt.toString()),
        );
    if (query.from && query.to) conditions.push(between(transactions.date, query.from, query.to));
    if (query.merchant)
        conditions.push(
            or(
                ilike(transactions.merchant, `%${query.merchant}%`),
                ilike(transactions.counterparty, `%${query.merchant}%`),
            ),
        );

    return conditions;
}

export async function getTransactions(query: TransactionQuery = {}) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 25;

    const orderCol = query.sortBy ? transactions[query.sortBy] : transactions.date;
    const orderDir = query.sortDir === 'asc' ? asc(orderCol) : desc(orderCol);

    const where = and(...buildConditions(query));

    const [data, [{ totalResults }], [{ totalAmount }]] = await Promise.all([
        db
            .select()
            .from(transactions)
            .where(where)
            .orderBy(orderDir)
            .limit(pageSize)
            .offset((page - 1) * pageSize),
        db.select({ totalResults: count() }).from(transactions).where(where),
        db
            .select({ totalAmount: sum(transactions.amount) })
            .from(transactions)
            .where(where),
    ]);

    return { data, totalResults, totalAmount: parseFloat(totalAmount ?? '0') };
}

export async function getAmtBounds() {
    const [row] = await db
        .select({
            minBound: min(transactions.amount),
            maxBound: max(transactions.amount),
        })
        .from(transactions);

    return {
        minBound: parseFloat(row.minBound ?? '0'),
        maxBound: parseFloat(row.maxBound ?? '0'),
    };
}

export async function getUsers() {
    const rows = await db.selectDistinct({ user: transactions.user }).from(transactions);
    return rows.map((r) => r.user);
}

export async function getCategoryStats(query: TransactionQuery) {
    const where = and(...buildConditions(query));

    return await db
        .select({
            category: transactions.category,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(where)
        .groupBy(transactions.category);
}

export async function getMonthlyStats(query: TransactionQuery) {
    const where = and(...buildConditions(query));

    return await db
        .select({
            month: sql<string>`to_char(date_trunc('month', ${transactions.date}), 'YYYY-MM')`,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(where, sql`${transactions.amount} < 0`))
        .groupBy(sql`date_trunc('month', ${transactions.date})`)
        .orderBy(sql`date_trunc('month', ${transactions.date})`);
}
