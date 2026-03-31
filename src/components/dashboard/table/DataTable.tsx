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
import { fmtAmt, getAmtCn } from '#/lib/tableUtils';
import { cn } from '#/lib/utils';
import { Fragment } from 'react/jsx-runtime';

interface DataTableProps {
    columns: ColumnDef<DbTransaction>[];
    data: DbTransaction[];
    totalResults: number;
}

function getSums(txs: DbTransaction[]) {
    const amtIn = Math.round(
        txs.filter((tx) => Number(tx.amount) > 0).reduce((sum, tx) => sum + Number(tx.amount), 0),
    );
    const amtOut = Math.round(
        txs.filter((tx) => Number(tx.amount) < 0).reduce((sum, tx) => sum + Number(tx.amount), 0),
    );
    return {
        amtIn: { amt: amtIn, header: 'Inn' },
        amtOut: { amt: amtOut, header: 'Ut' },
        total: { amt: amtIn + amtOut, header: 'Total' },
    };
}

export function DataTable({ columns, data, totalResults }: DataTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-md border flex flex-col w-fit mx-auto">
            <Table className="[&_tbody_tr]:grid [&_tbody_tr]:grid-cols-[4rem_1fr_auto_auto_auto] [&_tbody_tr]:items-center">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={columns.length}>
                            <div className="flex flex-col my-0 p-2">
                                <QueryControls />
                                <p className="text-xs text-muted-foreground mx-auto my-0.5">
                                    {`Viser ${table.getRowModel().rows.length} av ${totalResults} resultater...`}
                                </p>
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
                <TableFooter className="bg-transparent">
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={columns.length}>
                            <div className="flex w-full items-center justify-center gap-x-16">
                                {Object.values(getSums(data)).map((d, i, arr) => (
                                    <Fragment key={d.header}>
                                        <div className="flex items-center flex-col min-w-18">
                                            <span className="text-xs text-muted-foreground">
                                                {d.header}
                                            </span>
                                            <span
                                                className={cn(
                                                    'text-sm font-medium',
                                                    getAmtCn(d.amt),
                                                )}
                                            >
                                                {fmtAmt(d.amt)}
                                            </span>
                                        </div>
                                        {i < arr.length - 1 && (
                                            <div className="w-px h-6 bg-border shrink-0" />
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
