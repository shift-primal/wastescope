export const fmtAmt = (amt: number) => `${amt > 0 ? '+' : ''}${amt.toLocaleString('nb-NO')} kr`;

export const getAmtCn = (amt: number) =>
    amt === 0 ? 'text-muted-foreground' : amt > 0 ? 'text-green-400' : 'text-red-400';
