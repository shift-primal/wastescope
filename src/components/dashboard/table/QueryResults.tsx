import { fmtAmt, getAmtCn } from '#/lib/tableUtils';
import { cn } from '#/lib/utils';
import type { Stats } from './DataTable';

export const QueryResults = ({ stats }: { stats: Stats[] }) => {
    console.log(stats);
    return (
        <div className="flex items-center justify-center border-t pt-2 divide-x divide-border">
            {stats.map((d) => (
                <div key={d.header} className="flex flex-col items-center min-w-18 px-6">
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
