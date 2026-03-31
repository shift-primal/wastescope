import { date, numeric, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { CATEGORIES } from 'txcategorizer';

export const categoryEnum = pgEnum('category', CATEGORIES);

export const transactions = pgTable('transactions', {
    id: serial().primaryKey(),
    date: date(),
    amount: numeric(),
    merchant: text().notNull(),
    counterparty: text(),
    category: categoryEnum().notNull(),
    type: text().notNull(),
    currency: text(),
    exchangeRate: numeric(),
    user: text().notNull(),
});

export type DbTransaction = typeof transactions.$inferSelect;
