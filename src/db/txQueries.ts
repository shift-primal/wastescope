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
import { transactions, users } from './schema';
import { db } from './index.ts';
export type { TransactionQuery } from '#/types/transactions';
export { SORT_FIELDS } from '#/types/transactions';
import type { TransactionQuery, ValidColor } from '#/types/transactions';

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

    const [data, [{ totalResults }], [{ totalIn, totalOut }], [{ unfilteredTotal }]] =
        await Promise.all([
            db
                .select()
                .from(transactions)
                .where(where)
                .orderBy(orderDir)
                .limit(pageSize)
                .offset((page - 1) * pageSize),
            db.select({ totalResults: count() }).from(transactions).where(where),
            db
                .select({
                    totalIn: sum(
                        sql`CASE WHEN ${transactions.amount}::numeric > 0 THEN ${transactions.amount}::numeric ELSE 0 END`,
                    ),
                    totalOut: sum(
                        sql`CASE WHEN ${transactions.amount}::numeric < 0 THEN ${transactions.amount}::numeric ELSE 0 END`,
                    ),
                })
                .from(transactions)
                .where(where),
            db.select({ unfilteredTotal: count() }).from(transactions),
        ]);

    return {
        data,
        totalResults,
        unfilteredTotal,
        totalIn: parseFloat(totalIn ?? '0'),
        totalOut: parseFloat(totalOut ?? '0'),
    };
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

export async function getCategoryStats(query: TransactionQuery) {
    const where = and(...buildConditions(query));
    const sign = query.minAmt !== undefined && query.minAmt > 0
        ? sql`${transactions.amount} > 0`
        : sql`${transactions.amount} < 0`;

    return await db
        .select({
            category: transactions.category,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(where, sign))
        .groupBy(transactions.category);
}

export async function getMonthlyStats(query: TransactionQuery) {
    const where = and(...buildConditions(query));
    const sign = query.minAmt !== undefined && query.minAmt > 0
        ? sql`${transactions.amount} > 0`
        : sql`${transactions.amount} < 0`;

    return await db
        .select({
            month: sql<string>`to_char(date_trunc('month', ${transactions.date}), 'YYYY-MM')`,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(where, sign))
        .groupBy(sql`date_trunc('month', ${transactions.date})`)
        .orderBy(sql`date_trunc('month', ${transactions.date})`);
}

export async function getMonthlyStatsByUser(query: TransactionQuery) {
    const where = and(...buildConditions(query));
    const sign = query.minAmt !== undefined && query.minAmt > 0
        ? sql`${transactions.amount} > 0`
        : sql`${transactions.amount} < 0`;

    return await db
        .select({
            month: sql<string>`to_char(date_trunc('month', ${transactions.date}), 'YYYY-MM')`,
            user: transactions.user,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(where, sign))
        .groupBy(sql`date_trunc('month', ${transactions.date})`, transactions.user)
        .orderBy(sql`date_trunc('month', ${transactions.date})`);
}

export async function getUserStats(query: TransactionQuery) {
    const where = and(...buildConditions(query));
    const sign = query.minAmt !== undefined && query.minAmt > 0
        ? sql`${transactions.amount} > 0`
        : sql`${transactions.amount} < 0`;

    return await db
        .select({
            user: transactions.user,
            total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(where, sign))
        .groupBy(transactions.user);
}

export async function getUsers() {
    return await db.select().from(users);
}

export async function createUser(name: string, color: ValidColor) {
    const [user] = await db.insert(users).values({ name, color }).returning();
    return user;
}
