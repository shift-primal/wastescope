import type { Transaction } from 'txcategorizer';
import { columns } from './dashboard/table/columns';
import { DataTable } from './dashboard/table/DataTable';

export function Dashboard({ txs }: { txs: Transaction[] }) {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={txs} />
        </div>
    );
}
