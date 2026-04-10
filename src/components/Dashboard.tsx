import { cn } from '#/lib/utils';
import type { CategoryStat, MonthlyStat, TransactionResult } from '#/types/transactions';
import { DataCharts } from './dashboard/charts/DataCharts';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';

export function Dashboard({
    txResult,
    monthlyStats,
    categoryStats,
    className,
}: {
    txResult: TransactionResult;
    monthlyStats: MonthlyStat[];
    categoryStats: CategoryStat[];
    className: string;
}) {
    const { data: txData, totalResults, unfilteredTotal, totalIn, totalOut } = txResult;

    return (
        <div className={cn('p-3 sm:p-6 flex flex-col items-center gap-y-4 max-w-7xl mx-auto w-full', className)}>
            <DataCharts monthlyStats={monthlyStats} categoryStats={categoryStats} />
            <DataTable
                columns={columns}
                data={txData}
                totalResults={totalResults}
                unfilteredTotal={unfilteredTotal}
                totalIn={totalIn}
                totalOut={totalOut}
            />
        </div>
    );
}
