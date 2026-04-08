import { Button } from '#/components/ui/button';
import type { DashboardSearch } from '#/routes/dashboard';
import { useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export const ClearFiltersButton = () => {
    const navigate = useNavigate();

    const resetFilters = () =>
        navigate({
            to: '/dashboard',
            search: () => ({}) as DashboardSearch,
        });

    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
                <Button onClick={resetFilters} variant="destructive" className="aspect-square">
                    <RotateCcw className="size-3.5" />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit h-fit text-sm p-2">Reset filtre</HoverCardContent>
        </HoverCard>
    );
};
