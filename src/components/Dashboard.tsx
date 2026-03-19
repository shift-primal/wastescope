import type { Transaction } from 'txcategorizer';
import { columns } from './dashboard/table/Columns';
import { DataTable } from './dashboard/table/DataTable';
import { QueryControls } from './dashboard/querycontrols/QueryControls';
import { cn } from '#/lib/utils';

export function Dashboard({
    txs,
    className,
}: {
    txs: Transaction[];
    navigate: any;
    className: string;
}) {
    return (
        <div className={cn('container mx-auto py-10', className)}>
            <QueryControls />
            <DataTable columns={columns} data={txs} />
        </div>
    );
}
