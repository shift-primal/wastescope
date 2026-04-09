import { Button } from '#/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/ui/tooltip';
import type { DashboardSearch } from '#/types/transactions';

export const ClearFiltersButton = () => {
    const navigate = useNavigate();

    const resetFilters = () =>
        navigate({
            to: '/dashboard',
            search: () => ({}) as DashboardSearch,
        });

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={resetFilters} variant="destructive" className="aspect-square">
                    <RotateCcw className="size-3.5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Reset filtre...</TooltipContent>
        </Tooltip>
    );
};
