import type { Category } from 'txcategorizer';
import type { DbTransaction } from '#/db/schema';

export type { DbTransaction };

export type TransactionResult = {
    data: DbTransaction[];
    totalResults: number;
};

export type CategoryStat = {
    category: Category;
    total: string | null;
};

export type MonthlyStat = {
    month: string;
    total: string | null;
};

export type TransactionQuery = {
    // filtering
    user?: string[];
    category?: Category[];
    minAmt?: number;
    maxAmt?: number;
    from?: string;
    to?: string;
    merchant?: string;
    // sorting
    sortBy?: 'date' | 'amount' | 'merchant' | 'category';
    sortDir?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
};

export const SORT_FIELDS = {
    date: 'Dato',
    amount: 'Mengde',
    merchant: 'Forhandler',
    category: 'Kategori',
} satisfies Record<NonNullable<TransactionQuery['sortBy']>, string>;
