import type { Category } from 'txcategorizer';

export type TransactionQuery = {
    // filtering
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
