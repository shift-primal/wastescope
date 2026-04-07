import type { TransactionResult, MonthlyStat, CategoryStat } from '#/types/transactions';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { cn } from '#/lib/utils';
import { PageControls } from './dashboard/querycontrols/controls/PageControls';
import { DataCharts } from './dashboard/charts/DataCharts';

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
    const { data: txData, totalResults } = txResult;

    return (
        <div className={cn('p-6 flex flex-col items-center gap-y-4 w-fit mx-auto', className)}>
            <DataCharts monthlyStats={monthlyStats} categoryStats={categoryStats} />
            <DataTable columns={columns} data={txData} totalResults={totalResults} />
            <PageControls />
        </div>
    );
}
