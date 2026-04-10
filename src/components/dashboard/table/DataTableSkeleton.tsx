import { Skeleton } from '#/components/ui/skeleton';

const ROW_COUNT = 25;

const merchantWidths = ['w-28', 'w-36', 'w-24', 'w-32', 'w-20', 'w-40', 'w-28'];
const subtitleWidths = ['w-16', 'w-20', 'w-14', 'w-18', 'w-12'];
const amountWidths = ['w-14', 'w-16', 'w-12', 'w-18', 'w-14'];

function pick(arr: string[], i: number) {
    return arr[i % arr.length];
}

export function DataTableSkeleton() {
    return (
        <div className="p-3 sm:p-6 flex flex-col items-center gap-y-4 w-full">
            {/* Charts row */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-x-4 w-full">
                <Skeleton className="h-64 w-full md:flex-1 rounded-xl" />
                <Skeleton className="h-64 w-full md:w-72 rounded-xl" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border w-full">
                {/* Controls bar */}
                <div className="border-b px-4 py-3 flex flex-wrap gap-2 items-center">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 flex-1 min-w-32 md:min-w-0 md:w-44" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8" />
                </div>

                {/* Rows */}
                <div className="overflow-x-auto">
                    <div className="min-w-[500px]">
                        {Array.from({ length: ROW_COUNT }).map((_, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[4rem_1fr_auto_auto_auto] items-center border-b last:border-0 px-2 py-2 gap-x-2"
                            >
                                {/* Category badge */}
                                <div className="flex justify-center">
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </div>

                                {/* Merchant + subtitle */}
                                <div className="flex flex-col gap-y-1.5">
                                    <Skeleton className={`h-3.5 ${pick(merchantWidths, i)}`} />
                                    <Skeleton className={`h-2.5 ${pick(subtitleWidths, i)}`} />
                                </div>

                                {/* Date */}
                                <div className="flex flex-col items-end gap-y-1.5">
                                    <Skeleton className="h-3.5 w-12" />
                                    <Skeleton className="h-2 w-6" />
                                </div>

                                {/* Amount */}
                                <div className="flex flex-col items-end mr-4 gap-y-1.5">
                                    <Skeleton className={`h-3.5 ${pick(amountWidths, i)}`} />
                                </div>

                                {/* User */}
                                <div className="flex flex-col items-center gap-y-1.5">
                                    <Skeleton className="h-3 w-3 rounded-full" />
                                    <Skeleton className="h-4 w-10 rounded-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer — Inn / Ut / Total */}
                <div className="border-t px-4 py-3 flex items-center justify-center gap-x-8 sm:gap-x-16">
                    <div className="flex flex-col items-center gap-y-1.5 min-w-14 sm:min-w-18">
                        <Skeleton className="h-2.5 w-6" />
                        <Skeleton className="h-3.5 w-14" />
                    </div>
                    <div className="w-px h-6 bg-border shrink-0" />
                    <div className="flex flex-col items-center gap-y-1.5 min-w-14 sm:min-w-18">
                        <Skeleton className="h-2.5 w-4" />
                        <Skeleton className="h-3.5 w-16" />
                    </div>
                    <div className="w-px h-6 bg-border shrink-0" />
                    <div className="flex flex-col items-center gap-y-1.5 min-w-14 sm:min-w-18">
                        <Skeleton className="h-2.5 w-8" />
                        <Skeleton className="h-3.5 w-14" />
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
            </div>
        </div>
    );
}
