import type { DbTransaction } from '#/db/schema';
import { fmtAmt, getAmtCn } from '#/lib/tableUtils';
import { cn } from '#/lib/utils';

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

export const QueryResults = ({
    data,
    totalResults,
}: {
    data: DbTransaction[];
    totalResults: number;
}) => {
    return (
        <div className="flex items-center justify-center border-t pt-2 divide-x divide-border">
            <div className="flex flex-col items-center min-w-18 px-6">
                <span className="text-xs text-muted-foreground">Resultater</span>
                <span className="text-sm font-medium">{totalResults}</span>
            </div>
            {Object.values(getSums(data)).map((d) => (
                <div key={d.header} className="flex flex-col items-center min-w-18 px-6">
                    <span className="text-xs text-muted-foreground">{d.header}</span>
                    <span className={cn('text-sm font-medium', getAmtCn(d.amt))}>
                        {fmtAmt(d.amt)}
                    </span>
                </div>
            ))}
        </div>
    );
};
