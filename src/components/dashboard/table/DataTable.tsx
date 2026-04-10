import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from '#/components/ui/table';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { QueryControls } from '../querycontrols/QueryControls';
import type { DbTransaction } from '#/types/transactions';
import { PageControls } from '../querycontrols/controls/PageControls';
import { QueryResults } from './QueryResults';
import { useUsers } from '#/hooks/useUsers';

interface DataTableProps {
    columns: ColumnDef<DbTransaction>[];
    data: DbTransaction[];
    totalResults: number;
    unfilteredTotal: number;
    totalIn: number;
    totalOut: number;
}

export interface Stats {
    header: string;
    amt: number;
    total?: number;
    isCount?: boolean;
}

export function DataTable({
    columns,
    data,
    totalResults,
    totalIn,
    totalOut,
    unfilteredTotal,
}: DataTableProps) {
    const { data: users } = useUsers();
    const colorMap = Object.fromEntries(users?.map((u) => [u.name, u.color]) ?? []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: { colorMap },
    });

    const stats: Stats[] = [
        { header: 'Resultater', amt: totalResults, total: unfilteredTotal, isCount: true },
        { header: 'Inn', amt: totalIn },
        { header: 'Ut', amt: totalOut },
        { header: 'Netto', amt: totalIn + totalOut },
    ];

    return (
        <div className="overflow-hidden rounded-md border flex flex-col w-full">
            {/* Controls — always full width, does not scroll */}
            <div className="flex flex-col items-center gap-y-2 py-2 px-4 border-b">
                <QueryControls />
                <QueryResults stats={stats} />
            </div>

            {/* Table body — scrolls horizontally on small screens */}
            <div className="overflow-x-auto">
                <Table className="min-w-[500px] [&_tbody_tr]:grid [&_tbody_tr]:grid-cols-[4rem_1fr_auto_auto_auto] [&_tbody_tr]:items-center">
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            style={{ width: cell.column.getSize() }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>No results.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter className="flex justify-center py-2 bg-transparent">
                        <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={columns.length}>
                                <PageControls />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
