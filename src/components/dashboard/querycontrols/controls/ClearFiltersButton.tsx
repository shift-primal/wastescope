import { Button } from '#/components/ui/button';
import type { DashboardSearch } from '#/routes/dashboard';
import { useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';

export const ClearFiltersButton = () => {
    const navigate = useNavigate();

    const resetFilters = () =>
        navigate({
            to: '/dashboard',
            search: () => ({}) as DashboardSearch,
        });

    return (
        <Button onClick={resetFilters} variant="destructive" className="aspect-square">
            <RotateCcw className="size-3.5" />
        </Button>
    );
};
