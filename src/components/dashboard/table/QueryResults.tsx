import { fmtAmt, getAmtCn } from '#/lib/tableUtils';
import { cn } from '#/lib/utils';
import type { Stats } from './DataTable';

export const QueryResults = ({ stats }: { stats: Stats[] }) => {
    return (
        <div className="flex items-center justify-center border-t pt-2 divide-x divide-border w-full">
            {stats.map((d) => (
                <div key={d.header} className="flex flex-col items-center flex-1 px-2 sm:px-6 whitespace-nowrap">
                    <span className="text-xs text-muted-foreground">{d.header}</span>
                    <span className={cn('text-sm font-medium', d.isCount ? '' : getAmtCn(d.amt))}>
                        {d.isCount ? (
                            d.total ? (
                                <>
                                    <span className="text-sm font-medium">{d.amt}</span>
                                    <span className="text-xs text-muted-foreground font-normal">
                                        {' '}
                                        / {d.total}
                                    </span>
                                </>
                            ) : (
                                d.amt
                            )
                        ) : (
                            fmtAmt(d.amt)
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};
