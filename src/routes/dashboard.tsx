import { Dashboard } from '#/components/Dashboard';
import type { TransactionQuery } from '#/types/transactions';
import { useTransactions } from '#/hooks/useTransactions';
import { createFileRoute } from '@tanstack/react-router';
import type { Category } from 'txcategorizer';

export const Route = createFileRoute('/dashboard')({
    validateSearch: (search) => {
        return {
            user: (search.user as string[]) ?? undefined,
            category: (search.category as Category[]) ?? undefined,
            minAmt: search.minAmt as number | undefined,
            maxAmt: search.maxAmt as number | undefined,
            merchant: search.merchant as string | undefined,
            from: (search.from as string) ?? '2025-01-01',
            to: (search.to as string) ?? new Date().toISOString().split('T')[0],
            sortBy: search.sortBy as TransactionQuery['sortBy'] | undefined,
            sortDir: search.sortDir as TransactionQuery['sortDir'] | undefined,
            page: search.page ? Number(search.page) : 1,
            pageSize: search.pageSize ? Number(search.pageSize) : 25,
        };
    },
    component: DashboardPage,
});

export function DashboardPage() {
    const search = Route.useSearch();
    const { data: txResult, isLoading: txsLoading } = useTransactions(search);

    if (txResult === undefined) return <h1>loading</h1>;

    return (
        <div>
            <Dashboard txResult={txResult} className={txsLoading ? 'opacity-50' : ''} />
        </div>
    );
}
