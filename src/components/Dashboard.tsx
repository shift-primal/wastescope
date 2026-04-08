import { cn } from '#/lib/utils';
import type { CategoryStat, MonthlyStat, TransactionResult } from '#/types/transactions';
import { DataCharts } from './dashboard/charts/DataCharts';
import { PageControls } from './dashboard/querycontrols/controls/PageControls';
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
    const { data: txData, totalResults } = txResult;

    return (
        <div className={cn('p-6 flex flex-col items-center gap-y-4 max-w-7xl mx-auto', className)}>
            <DataCharts monthlyStats={monthlyStats} categoryStats={categoryStats} />
            <DataTable columns={columns} data={txData} totalResults={totalResults} />
        </div>
    );
}
