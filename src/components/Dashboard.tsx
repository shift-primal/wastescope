import type { Transaction } from 'txcategorizer';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { QueryControls } from './dashboard/querycontrols/QueryControls';
import { cn } from '#/lib/utils';

export function Dashboard({
    txResult,
    className,
}: {
    txResult: { data: Transaction[]; total: number };
    className: string;
}) {
    const { data, total } = txResult;

    return (
        <div className={cn('container mx-auto py-10', className)}>
            <QueryControls total={total} />
            <DataTable columns={columns} data={data} />
        </div>
    );
}
