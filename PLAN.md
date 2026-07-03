# Wastescope Rebuild Plan

Rebuilding Wastescope from scratch on **Neon** + **TanStack Start server functions**,
replacing the old app's "fake API" (`routes/api/*` HTTP handlers + axios client).

Old project reference: `/home/kasper/Documents/dev/WebDev/ws_old/wastescope_app`

## Decisions (locked)

- **Auth:** Real auth now, via **Neon Auth** — which is **Better Auth** under the hood (NOT the
  older Stack Auth). Identity table is **`neon_auth.user`** (uuid `id`); there is **no**
  `users_sync` table. Email/password + Google are enabled. JWT plugin is auto-enabled.
- **Auth transport (locked):** App and auth server are on **different domains**, so the session
  cookie never reaches our server functions. Instead we use **bearer JWTs**: client calls
  `authClient.token()` and attaches `Authorization: Bearer <jwt>`; the server verifies it against
  the **JWKS** endpoint with `jose` and reads `payload.sub` as `ownerId`. Tokens are EdDSA,
  expire in 15 min (SDK auto-refreshes on each `token()` call). Implemented as a `type: "function"`
  middleware in `src/lib/authMiddleware.ts`. **Verified end-to-end** (real uuid returned).
- **DB driver:** **Neon HTTP + Drizzle** (`drizzle-orm/neon-http` + `@neondatabase/serverless`).
- **Data model (locked): single-user.** Every transaction belongs to the authenticated user via
  `ownerId` (= `neon_auth.user.id`, a **uuid**). Always derive `ownerId` from the verified JWT,
  never from client input. **No person-label `users` table** — the old household/multi-person
  concept is dropped now that real auth isolates each account. This removes: the `users` table,
  the `user` column + FK, `COLOR_OPTIONS`/colors, and all per-user stats/UI.
  - Schema is essentially one table: `transactions` (+ `category` / `transaction_type` enums).
- **Neon project:** `Wastescope` (`dark-grass-66927286`), Postgres 18, region eu-west-2.

## Architectural change

The whole `src/routes/api/*` layer + axios `client` + `parseQuery.ts` is deleted. The Drizzle
query functions in `txQueries.ts` are wrapped as TanStack Start **server functions**
(`createServerFn`) and called directly from React Query hooks with a typed object — no HTTP
serialization, no URL param parsing.

---

## Step-by-step

### 1. Foundation ✅ DONE
- [x] Consolidate DB access to a single `src/db/index.ts` using `drizzle-orm/neon-http` +
      `@neondatabase/serverless`. Delete `src/db.ts` and the `node-postgres` variant.
- [x] Delete `compose.yml` (Neon is the DB; no local Docker Postgres).
- [x] Point `drizzle.config.ts` at Neon (env already set in `.env.local`).
- [x] Install deps (except `recharts`, which arrives via `shadcn add chart` in step 7).
- [x] Do NOT install: `axios`, `qs` (server functions make them unnecessary).

### 2. Neon Auth wiring ✅ DONE
- [x] Confirmed Neon Auth provisioned (Better Auth; identity table `neon_auth.user`, uuid `id`).
- [x] Built `type: "function"` auth middleware (`src/lib/authMiddleware.ts`): client attaches
      bearer JWT, server verifies via JWKS with `jose`, exposes `context.ownerId`. Verified e2e.
- [x] Sign-in / sign-up UI via `auth.$pathname` + `account.$pathname` routes.
- [ ] Protect the home route (`SignedIn` / `RedirectToSignIn` + `useSession`). (still to do)

### 3. Schema + migrate
- [x] `transactions` table with `ownerId uuid notNull`, `category` + `transaction_type` enums
      (from txcategorizer), `currency` + `exchangeRate` on the row, index on `ownerId`.
- [ ] `pnpm db:push` against Neon (schemaFilter defaults to `public`, so `neon_auth` is untouched).

### 4. Server-function layer (core change)
- [ ] Port the relevant `txQueries.ts` fns, adding `ownerId` to every `where` clause.
- [ ] Wrap each as a `createServerFn` behind `authMiddleware`:
  - [ ] `getTransactions`
  - [ ] `getAmtBounds`
  - [ ] `getCategoryStats`, `getMonthlyStats` (single-series — no per-user split)
  - [ ] `importTransactions` (CSV upload — old POST)
  - [ ] `deleteAllTransactions` (old DELETE)
  - [ ] ~~`getUsers` / `createUser` / `getUserStats` / `getMonthlyStatsByUser`~~ (dropped: single-user)
- [ ] Validate inputs with Zod via `.inputValidator()`. Delete `parseQuery.ts`.

### 5. Types & validators
- [ ] Port `types/transactions.ts` (drop the `user`/`User` bits).
- [ ] Port validators into `src/lib/schemas/` (renamed `validators.ts`). Drop `createUserSchema`,
      `COLOR_OPTIONS`, `getColorHex`, and the `user` array in `dashboardSearchSchema`.

### 6. Data hooks
- [ ] Rewrite React Query hooks (`useTransactions`, `useAddTransaction`, `useAmtBounds`,
      `useCategoryStats`, `useMonthlyStats`) to call server functions directly.
      Drop axios; keep the existing query keys. (No `useUsers`.)

### 7. UI
- [ ] Port `components/ui/*` (shadcn), `layout/*`, `dashboard/*` (table, charts, controls),
      `import/*`. Drop the user filter dropdown + "create user" UI; import form loses its `user` field.

### 8. Routes
- [ ] Port `index`, `dashboard`, `import` routes with `validateSearch` (dashboardSearchSchema),
      auth guard, and optional loader prefetch via server functions.

### 9. Seed
- [ ] Port `scripts/seed.ts` to run against Neon. Seeded rows need a valid `ownerId`
      (seed against a real test account).

### 10. Polish
- [ ] Port `styles.css`, `components.json`, theme toggle.
- [ ] `pnpm biome check`; run app and verify.

---

## Notes / risks
- Old schema checkout was mid-refactor: `users` table + `apiclient.ts` were referenced but
  missing. Reconstruct rather than copy.
- `ownerId` + auth middleware must land in steps 2–3 BEFORE server functions (step 4).
  Retrofitting ownership later is the painful path.
- Model is now single-user (household/person-labels dropped) — see Decisions.
