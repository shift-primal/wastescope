# Wastescope

A personal finance tracker for Norwegian bank CSV exports. Import transactions from DNB and Eika/Valle, automatically categorise them, and visualise your spending with charts and filters.

---

## Features

- **CSV import** — supports DNB and Eika/Valle export formats
- **Automatic categorisation** — rule-based parser extracts merchant and category from raw bank descriptions (100% match rate on test data)
- **Dashboard** — filterable transaction table with sorting, pagination, and date range selection
- **Charts** — monthly spending area chart and category breakdown donut chart
- **Multi-user** — track multiple people's finances with per-user colour coding
- **Dark/light mode** — full theme support

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (SSR) |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Server state | [TanStack Query](https://tanstack.com/query) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Database | PostgreSQL 17 |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Charts | Recharts |
| Validation | Zod, TanStack Form |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io)
- [Docker](https://www.docker.com) (for local Postgres)

### Setup

```bash
# Clone the repo
git clone https://github.com/kasperhaugestol/wastescope
cd wastescope

# Install dependencies
pnpm install

# Copy env file and configure
cp .env.example .env.local

# Start Postgres
docker compose up -d

# Run migrations
pnpm db:migrate

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed demo data

To populate the database with realistic fake transactions:

```bash
pnpm db:seed
```

This creates 2 demo users (Alex and Sam) with ~300 transactions across 12 months covering all spending categories.

---

## Deployment (Railway)

1. Create a new project on [Railway](https://railway.app)
2. Add a **PostgreSQL** plugin to the project
3. Connect your GitHub repo
4. Set environment variables:
   - `DATABASE_URL` — copied from the Postgres plugin
   - `BETTER_AUTH_SECRET` — any random 32-character string
   - `NODE_ENV` — `production`
5. Deploy — Railway will build with nixpacks and run migrations automatically on start

---

## Project structure

```
src/
  routes/          # File-based routes (pages + API handlers)
  components/      # UI components
    dashboard/     # Charts, table, filter controls
    import/        # CSV upload form
    layout/        # Header, footer
  db/
    schema.ts      # Drizzle schema
    txQueries.ts   # Database query functions
  hooks/           # React Query hooks
  types/           # Shared TypeScript types
  lib/             # Utilities and validators
scripts/
  seed.ts          # Demo data seed script
parser/            # Standalone Deno CSV parser (DNB + Eika/Valle)
```
