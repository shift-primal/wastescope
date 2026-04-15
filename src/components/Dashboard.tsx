import { cn } from '#/lib/utils';
import type {
    CategoryStat,
    MonthlyStatByUser,
    TransactionResult,
    UserStat,
} from '#/types/transactions';
import { DataCharts } from './dashboard/charts/DataCharts';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';

export function Dashboard({
    txResult,
    categoryStats,
    monthlyStatsByUser,
    userStats,
    isLoading = false,
    className,
}: {
    txResult: TransactionResult;
    categoryStats: CategoryStat[];
    monthlyStatsByUser?: MonthlyStatByUser[];
    userStats?: UserStat[];
    isLoading?: boolean;
    className?: string;
}) {
    const { data: txData, totalResults, unfilteredTotal, totalIn, totalOut } = txResult;

    return (
        <div
            className={cn(
                'p-3 sm:p-6 flex flex-col items-center gap-y-4 max-w-7xl mx-auto w-full',
                className,
            )}
        >
            <DataCharts
                categoryStats={categoryStats}
                monthlyStatsByUser={monthlyStatsByUser}
                userStats={userStats}
                isLoading={isLoading}
            />
            <DataTable
                columns={columns}
                data={txData}
                totalResults={totalResults}
                unfilteredTotal={unfilteredTotal}
                totalIn={totalIn}
                totalOut={totalOut}
                isLoading={isLoading}
            />
        </div>
    );
}
