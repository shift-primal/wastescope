import type { CategoryStat, MonthlyStatByUser, UserStat } from '#/types/transactions';
import { ByCategoryDonutChart } from './DonutChart';
import { ByMonthAreaChart } from './AreaChart';
import { Skeleton } from '#/components/ui/skeleton';
import { useSearch } from '@tanstack/react-router';

export const DataCharts = ({
    categoryStats,
    monthlyStatsByUser,
    userStats,
    isLoading = false,
}: {
    categoryStats: CategoryStat[];
    monthlyStatsByUser?: MonthlyStatByUser[];
    userStats?: UserStat[];
    isLoading?: boolean;
}) => {
    const { minAmt } = useSearch({ from: '/dashboard' });
    const incomeOnly = minAmt !== undefined && minAmt > 0;

    return (
        <div id="charts" className="flex flex-col md:flex-row w-full gap-4 md:gap-x-8">
            {isLoading ? (
                <>
                    <Skeleton className="h-55 w-full md:flex-1 rounded-xl" />
                    <Skeleton className="h-55 w-full md:w-72 rounded-xl" />
                </>
            ) : (
                <>
                    <ByMonthAreaChart
                        byUserData={monthlyStatsByUser ?? []}
                        incomeOnly={incomeOnly}
                    />
                    <ByCategoryDonutChart
                        data={categoryStats}
                        userStats={userStats}
                        incomeOnly={incomeOnly}
                    />
                </>
            )}
        </div>
    );
};
