import { Dashboard } from '#/components/Dashboard';
import { useMonthlyStats } from '#/hooks/useMonthlyStats';
import { useTransactions } from '#/hooks/useTransactions';
import { createFileRoute } from '@tanstack/react-router';
import { CATEGORIES } from 'txcategorizer';
import { z } from 'zod';

const dashboardSearchSchema = z.object({
    user: z.array(z.string()).optional(),
    category: z.array(z.enum(CATEGORIES)).optional(),
    minAmt: z.number().optional(),
    maxAmt: z.number().optional(),
    merchant: z.string().optional(),
    from: z.string().default(`${new Date().getFullYear() - 2}-01-01`),
    to: z.string().default(new Date().toISOString().split('T')[0]),
    sortBy: z.enum(['date', 'amount', 'merchant', 'category']).optional(),
    sortDir: z.enum(['asc', 'desc']).optional(),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().default(25),
});

export type DashboardSearch = z.infer<typeof dashboardSearchSchema>;

export const Route = createFileRoute('/dashboard')({
    validateSearch: dashboardSearchSchema,
    component: DashboardPage,
});

export function DashboardPage() {
    const search = Route.useSearch();
    const { data: txResult, isLoading: txsLoading } = useTransactions(search);
    const { data: monthlyStats, isLoading: monthlyLoading } = useMonthlyStats(search);

    if (!txResult || !monthlyStats) return <h1>loading</h1>;

    return (
        <div>
            <Dashboard
                txResult={txResult}
                monthlyStats={monthlyStats}
                className={txsLoading || monthlyLoading ? 'opacity-50' : ''}
            />
        </div>
    );
}
