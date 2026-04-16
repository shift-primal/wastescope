import { useSearch } from '@tanstack/react-router';
import { useCategoryStats } from '#/hooks/stats/useCategoryStats';
import { useMonthlyStatsByUser } from '#/hooks/stats/useMonthlyStatsByUser';
import { useTransactions } from '#/hooks/transactions/useTransactions';
import { useUserStats } from '#/hooks/user/useUserStats';
import { Dashboard } from '../dashboard/Dashboard';

const EMPTY_TX_RESULT = { data: [], totalResults: 0, unfilteredTotal: 0, totalIn: 0, totalOut: 0 };

export const DashboardPage = () => {
    const search = useSearch({ from: '/dashboard' });
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
};
