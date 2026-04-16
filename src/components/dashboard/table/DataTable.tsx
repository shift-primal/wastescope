import { Table, TableBody, TableCell, TableFooter, TableRow } from '#/components/ui/table';
import { Skeleton } from '#/components/ui/skeleton';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { QueryControls } from '../querycontrols/QueryControls';
import type { DbTransaction } from '#/types/transactions';
import { PageControls } from '../querycontrols/controls/PageControls';
import { QueryResults } from './QueryResults';
import { useUsers } from '#/hooks/user/useUsers';

interface DataTableProps {
    columns: ColumnDef<DbTransaction>[];
    data: DbTransaction[];
    totalResults: number;
    unfilteredTotal: number;
    totalIn: number;
    totalOut: number;
    isLoading?: boolean;
}

export interface Stats {
    header: string;
    amt: number;
    total?: number;
    isCount?: boolean;
}

const merchantWidths = ['w-28', 'w-36', 'w-24', 'w-32', 'w-20', 'w-40', 'w-28'];
const subtitleWidths = ['w-16', 'w-20', 'w-14', 'w-18', 'w-12'];
const amountWidths = ['w-14', 'w-16', 'w-12', 'w-18', 'w-14'];
function pick(arr: string[], i: number) {
    return arr[i % arr.length];
}

export function DataTable({
    columns,
    data,
    totalResults,
    totalIn,
    totalOut,
    unfilteredTotal,
    isLoading = false,
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
            <div className="flex flex-col items-center gap-y-2 py-2 px-4 border-b">
                <QueryControls />
                {isLoading ? (
                    <div className="flex w-full border-t pt-2 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center flex-1 gap-y-1.5 px-2"
                            >
                                <Skeleton className="h-2.5 w-10" />
                                <Skeleton className="h-3.5 w-14" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <QueryResults stats={stats} />
                )}
            </div>

            <Table className="max-w-full md:min-w-125 [&_tbody_tr]:grid [&_tbody_tr]:grid-cols-[2.5rem_1fr_4rem_5.5rem] md:[&_tbody_tr]:grid-cols-[4rem_1fr_auto_auto_auto] [&_tbody_tr]:items-center">
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 15 }).map((_, i) => (
                            <TableRow key={i} className="hover:bg-transparent">
                                <TableCell className="flex justify-center">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-y-1.5">
                                        <Skeleton className={`h-3.5 ${pick(merchantWidths, i)}`} />
                                        <Skeleton className={`h-2.5 ${pick(subtitleWidths, i)}`} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-end gap-y-1.5">
                                        <Skeleton className="h-3.5 w-12" />
                                        <Skeleton className="h-2 w-6" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-end mr-4 gap-y-1.5">
                                        <Skeleton className={`h-3.5 ${pick(amountWidths, i)}`} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex-col items-center gap-y-1.5 hidden md:flex">
                                        <Skeleton className="h-3 w-3 rounded-full" />
                                        <Skeleton className="h-4 w-10 rounded-sm" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={
                                            cell.column.id === 'user' ? 'hidden md:block' : ''
                                        }
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
    );
}
