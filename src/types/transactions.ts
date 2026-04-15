import type { Category } from 'txcategorizer';
import type { z } from 'zod';
import type { DbTransaction } from '#/db/schema';
import type { dashboardSearchSchema } from '#/lib/validators';

// queriy types
export type DashboardSearch = z.infer<typeof dashboardSearchSchema>;
export type TransactionQuery = Partial<DashboardSearch>;

export const SORT_FIELDS = {
    date: 'Dato',
    amount: 'Mengde',
    merchant: 'Forhandler',
    category: 'Kategori',
} satisfies Record<NonNullable<TransactionQuery['sortBy']>, string>;

// API response types
export type TransactionResult = {
    data: DbTransaction[];
    totalResults: number;
    totalIn: number;
    totalOut: number;
    unfilteredTotal: number;
};

export type CategoryStat = {
    category: Category;
    total: string | null;
};

export type MonthlyStat = {
    month: string;
    total: string | null;
};

export type MonthlyStatByUser = {
    month: string;
    user: string;
    total: string | null;
};

export type UserStat = {
    user: string;
    total: string | null;
};

// re-exports from db
export type { DbTransaction, User, ValidColor } from '#/db/schema';
