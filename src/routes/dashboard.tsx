import { Dashboard } from '#/components/Dashboard';
import { DataTableSkeleton } from '#/components/dashboard/table/DataTableSkeleton';
import { useCategoryStats } from '#/hooks/useCategoryStats';
import { useMonthlyStats } from '#/hooks/useMonthlyStats';
import { useTransactions } from '#/hooks/useTransactions';
import { dashboardSearchSchema } from '#/lib/validators';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
    validateSearch: dashboardSearchSchema,
    component: DashboardPage,
});

export function DashboardPage() {
    const search = Route.useSearch();
    const { data: txResult, isLoading: txsLoading } = useTransactions(search);
    const { data: monthlyStats, isLoading: monthlyLoading } = useMonthlyStats(search);
    const { data: categoryStats, isLoading: categoryLoading } = useCategoryStats(search);

    if (!txResult || !monthlyStats || !categoryStats) return <DataTableSkeleton />;

    return (
        <div>
            <Dashboard
                txResult={txResult}
                monthlyStats={monthlyStats}
                categoryStats={categoryStats}
                className={txsLoading || monthlyLoading || categoryLoading ? 'opacity-50' : ''}
            />
        </div>
    );
}
