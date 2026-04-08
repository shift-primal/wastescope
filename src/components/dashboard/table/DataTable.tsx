import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '#/components/ui/table';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { QueryControls } from '../querycontrols/QueryControls';
import type { DbTransaction } from '#/types/transactions';
import { PageControls } from '../querycontrols/controls/PageControls';
import { QueryResults } from './QueryResults';

interface DataTableProps {
    columns: ColumnDef<DbTransaction>[];
    data: DbTransaction[];
    totalResults: number;
}

export function DataTable({ columns, data, totalResults }: DataTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-md border flex flex-col w-full">
            <Table className="[&_tbody_tr]:grid [&_tbody_tr]:grid-cols-[4rem_1fr_auto_auto_auto] [&_tbody_tr]:items-center">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={columns.length}>
                            <div className="flex flex-col items-center gap-y-2 py-2 px-4">
                                <QueryControls />
                                <QueryResults data={data} totalResults={totalResults} />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
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
                    <PageControls />
                </TableFooter>
            </Table>
        </div>
    );
}
