import { date, numeric, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { CATEGORIES } from 'txcategorizer';

export const COLOR_OPTIONS = [
    { label: 'Rød', value: 'red', hex: '#ef4444' },
    { label: 'Oransje', value: 'orange', hex: '#f97316' },
    { label: 'Gul', value: 'yellow', hex: '#eab308' },
    { label: 'Grønn', value: 'green', hex: '#22c55e' },
    { label: 'Blå', value: 'blue', hex: '#3b82f6' },
    { label: 'Lilla', value: 'purple', hex: '#a855f7' },
    { label: 'Rosa', value: 'pink', hex: '#ec4899' },
] as const;

export const getColorHex = (color: ValidColor): string =>
    COLOR_OPTIONS.find((c) => c.value === color)?.hex ?? '#888888';

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
