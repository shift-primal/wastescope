import { Dashboard } from '#/components/Dashboard';
import type { TransactionQuery } from '#/db/txQueries';
import { useTransactions } from '#/hooks/useTransactions';
import { createFileRoute } from '@tanstack/react-router';
import type { Category } from 'txcategorizer';

export const Route = createFileRoute('/dashboard')({
    validateSearch: (search) => {
        console.log('search.category: ', search.category);
        return {
            category: (search.category as Category[]) ?? undefined,
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
    const navigate = Route.useNavigate();
    const search = Route.useSearch();
    const { data: txs, isLoading: txsLoading } = useTransactions(search);

    if (txs === undefined) return <h1>loading</h1>;

    console.log(search);

    return (
        <div>
            <Dashboard txs={txs} navigate={navigate} className={txsLoading ? 'opacity-50' : ''} />
        </div>
    );
}
