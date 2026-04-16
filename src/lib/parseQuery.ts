import type { TransactionQuery } from '#/db/txQueries';

export function parseTransactionQuery(url: URL): TransactionQuery {
    const p = url.searchParams;
    return {
        user: p.getAll('user'),
        category: p.getAll('category') as TransactionQuery['category'],
        merchant: p.get('merchant') ?? undefined,
        minAmt: p.get('minAmt') ? Number(p.get('minAmt')) : undefined,
        maxAmt: p.get('maxAmt') ? Number(p.get('maxAmt')) : undefined,
        from: p.get('from') ?? undefined,
        to: p.get('to') ?? undefined,
        sortBy: (p.get('sortBy') as TransactionQuery['sortBy']) ?? undefined,
        sortDir: (p.get('sortDir') as TransactionQuery['sortDir']) ?? undefined,
        page: p.get('page') ? Number(p.get('page')) : undefined,
        pageSize: p.get('pageSize') ? Number(p.get('pageSize')) : undefined,
    };
}
