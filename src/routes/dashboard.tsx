import { dashboardSearchSchema } from '#/lib/validators';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '#/components/pages/DashboardPage';

export const Route = createFileRoute('/dashboard')({
    validateSearch: dashboardSearchSchema,
    component: DashboardPage,
});
