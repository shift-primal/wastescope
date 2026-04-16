import { Route } from '#/routes/dashboard';
import { useNavigate } from '@tanstack/react-router';

type DashboardSearch = ReturnType<typeof Route.useSearch>;

export const useDashboardNavigate = () => {
    const navigate = useNavigate();
    return (updater: (prev: DashboardSearch) => Partial<DashboardSearch>) =>
        navigate({
            to: '/dashboard',
            search: (prev) => ({ ...updater(prev), page: 1 }),
            resetScroll: false,
        });
};
