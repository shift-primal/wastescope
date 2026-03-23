import type { Transaction } from 'txcategorizer';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { cn } from '#/lib/utils';

export function Dashboard({
    txResult,
    className,
}: {
    txResult: { data: Transaction[]; totalResults: number };
    className: string;
}) {
    const { data, totalResults } = txResult;

    return (
        <div className={cn('container mx-auto py-10', className)}>
            <DataTable columns={columns} data={data} totalResults={totalResults} />
        </div>
    );
}
