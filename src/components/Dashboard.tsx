import type { TransactionResult, MonthlyStat } from '#/types/transactions';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { cn } from '#/lib/utils';
import { PageControls } from './dashboard/querycontrols/controls/PageControls';
import { ByMonthAreaChart } from './dashboard/charts/ByMonthAreaChart';

export function Dashboard({
    txResult,
    monthlyStats,
    className,
}: {
    txResult: TransactionResult;
    monthlyStats: MonthlyStat[];
    className: string;
}) {
    const { data: txData, totalResults } = txResult;

    return (
        <div>
            <div className={cn('p-6 flex flex-col items-center gap-y-4', className)}>
                <ByMonthAreaChart data={monthlyStats} />
                <DataTable columns={columns} data={txData} totalResults={totalResults} />
                <PageControls />
            </div>
        </div>
    );
}
