import type { Transaction } from 'txcategorizer';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { cn } from '#/lib/utils';
import { PageControls } from './dashboard/querycontrols/controls/PageControls';

export function Dashboard({
    txResult,
    className,
}: {
    txResult: { data: Transaction[]; totalResults: number; totalAmount: number };
    className: string;
}) {
    const { data, totalResults, totalAmount } = txResult;

    return (
        <div>
            <div className={cn('p-6 flex flex-col items-center gap-y-4', className)}>
                <DataTable
                    columns={columns}
                    data={data}
                    totalResults={totalResults}
                    totalAmount={totalAmount}
                />
                <PageControls />
            </div>
        </div>
    );
}
