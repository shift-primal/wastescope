# Wastescope — TODO & Audit

## Task Checklist

### Bugs & Correctness
- [ ] Fix amount filtering — `between()` uses string comparison on a numeric column (lexicographic ordering breaks for e.g. `"9" > "10"`). Use `sql` template literals instead
- [ ] Reset `page` to 1 whenever any filter changes — currently you can be stuck on page 5 after filtering down to 1 page of results
- [ ] Fix hardcoded `from: '2025-01-01'` in `validateSearch` — derive dynamically (first day of current year)
- [ ] Fix `pageSize` passed as string from `PageSizeDropdown` — `DropdownMenuRadioItem` gives strings, cast explicitly in `handlePageSize`

### Cleanup
- [ ] Delete `src/hooks/useTotal.ts` — empty file
- [ ] Delete `getTotalAmount()` from `src/db/txQueries.ts` — superseded by `totalAmount` inside `getTransactions`
- [ ] Extract `buildConditions(query)` from `getTransactions` — reusable WHERE clause builder for upcoming stat queries

### Code Quality
- [ ] Remove `any` on `prev` in all `navigate()` calls — TanStack Router knows the search type, use it
- [ ] Add real validation to `validateSearch` — currently all fields use `as` casts with no bounds checking (e.g. `page: -1` is accepted). Consider Zod
- [ ] Fix hardcoded `baseURL: 'http://localhost:3000'` in `apiclient.ts` — use relative base or `import.meta.env.VITE_API_URL`

### Charts — New Endpoints
- [ ] Add `getCategoryStats(query)` to `txQueries.ts` — GROUP BY category, SUM amount, filtered by same WHERE as `getTransactions`
- [ ] Add `getMonthlyStats(query)` to `txQueries.ts` — GROUP BY month (`date_trunc`), SUM of negative amounts only, same WHERE
- [ ] Add API endpoint `GET /api/transactions/stats/by-category`
- [ ] Add API endpoint `GET /api/transactions/stats/by-month`
- [ ] Add `useCategoryStats(query)` hook
- [ ] Add `useMonthlyStats(query)` hook
- [ ] Build pie/donut chart component (category breakdown for current search)
- [ ] Build area/line chart component (monthly outgoing for current search)
- [ ] Wire charts into `DashboardPage` alongside `useTransactions`

### Features
- [ ] Reset amount slider and user dropdown with reset button
- [ ] Keyboard shortcut (ESC) to reset all filters
- [ ] Duplicate detection on import (same date + amount + merchant)
- [ ] Click row to expand details
- [ ] Add next/prev page controls and page size selector *(in progress)*

---

## Audit Notes

### Amount Filtering Bug
`between(transactions.amount, query.minAmt.toString(), query.maxAmt.toString())` compares a
`numeric` column against string literals. PostgreSQL will coerce but lexicographic edge cases
exist. Fix:
```ts
between(transactions.amount, sql`${query.minAmt}`, sql`${query.maxAmt}`)
```

### Page Not Resetting on Filter Change
Every filter control navigates with `{ ...prev, field: value }` but never resets `page`.
Add `page: 1` to every filter update:
```ts
search: (prev) => ({ ...prev, category: newValue, page: 1 })
```

### Hardcoded Date
```ts
from: (search.from as string) ?? '2025-01-01'
```
Replace with:
```ts
from: (search.from as string) ?? `${new Date().getFullYear()}-01-01`
```

### Dead Code
- `src/hooks/useTotal.ts` — empty, never imported
- `getTotalAmount()` in `txQueries.ts` — `getTransactions` now returns `totalAmount` directly

### `any` on navigate `prev`
Every control uses `(prev: any)`. TanStack Router types the search params — remove the `any`.

### Hardcoded API Base URL
```ts
baseURL: 'http://localhost:3000'
```
This breaks in production. Use:
```ts
baseURL: import.meta.env.VITE_API_URL ?? ''
```
Or just use a relative base (`''`) since the app and API are on the same origin.

### Chart Data Flow
Both charts need all filtered rows (not just current page), so they need dedicated
server-side queries. They share the same filters as `getTransactions` — extract
`buildConditions(query)` first so all three queries reuse it.

```
URL params (TransactionQuery)
    ↓
useCategoryStats(query)     useMonthlyStats(query)
    ↓                            ↓
/api/transactions/          /api/transactions/
  stats/by-category           stats/by-month
    ↓                            ↓
getCategoryStats(query)     getMonthlyStats(query)
    ↓                            ↓
GROUP BY category           GROUP BY month
SUM amount                  SUM amount WHERE amount < 0
```

Query keys include the full `query` object so both hooks auto-refetch when any filter changes,
same as `useTransactions`.
