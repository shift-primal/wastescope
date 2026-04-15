import { Dashboard } from '#/components/Dashboard';
import { useCategoryStats } from '#/hooks/useCategoryStats';
import { useMonthlyStatsByUser } from '#/hooks/useMonthlyStatsByUser';
import { useUserStats } from '#/hooks/useUserStats';
import { useTransactions } from '#/hooks/useTransactions';
import { dashboardSearchSchema } from '#/lib/validators';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
    validateSearch: dashboardSearchSchema,
    component: DashboardPage,
});

const EMPTY_TX_RESULT = { data: [], totalResults: 0, unfilteredTotal: 0, totalIn: 0, totalOut: 0 };

export function DashboardPage() {
    const search = Route.useSearch();
    const incomeOnly = (search.minAmt ?? 0) > 0;

    const { data: txResult, isLoading: txsLoading } = useTransactions(search);
    const { data: categoryStats, isLoading: categoryLoading } = useCategoryStats(search);
    const { data: monthlyStatsByUser } = useMonthlyStatsByUser(search);
    const { data: userStats } = useUserStats(search, { enabled: incomeOnly });

    const isLoading = txsLoading || categoryLoading;

    return (
        <Dashboard
            txResult={txResult ?? EMPTY_TX_RESULT}
            categoryStats={categoryStats ?? []}
            monthlyStatsByUser={monthlyStatsByUser ?? []}
            userStats={incomeOnly ? (userStats ?? []) : undefined}
            isLoading={isLoading}
        />
    );
}
