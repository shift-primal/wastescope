import { date, numeric, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { CATEGORIES } from 'txcategorizer';

export const COLOR_OPTIONS = [
    { label: 'Rød', value: 'red' },
    { label: 'Oransje', value: 'orange' },
    { label: 'Gul', value: 'yellow' },
    { label: 'Grønn', value: 'green' },
    { label: 'Blå', value: 'blue' },
    { label: 'Lilla', value: 'purple' },
    { label: 'Rosa', value: 'pink' },
] as const;

export const validColorsEnum = pgEnum(
    'colors',
    COLOR_OPTIONS.map((c) => c.value) as [ValidColor, ...ValidColor[]],
);

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
    user: text()
        .notNull()
        .references(() => users.name, { onUpdate: 'cascade' }),
});

export const users = pgTable('users', {
    name: text().primaryKey(),
    color: validColorsEnum().notNull(),
});

export type DbTransaction = typeof transactions.$inferSelect;
export type User = typeof users.$inferSelect;
export type ValidColor = (typeof COLOR_OPTIONS)[number]['value'];
