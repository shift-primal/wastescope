import { Button } from '#/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { RotateCcw } from 'lucide-react';
import type { Category } from 'txcategorizer';

export const ClearFiltersButton = () => {
    const navigate = useNavigate();

    const resetFilters = () =>
        navigate({
            to: '/dashboard',
            search: () => ({
                category: [] as Category[],
                merchant: undefined,
                from: '2025-01-01',
                to: new Date().toISOString().split('T')[0],
                sortBy: undefined,
                sortDir: undefined,
                page: 1,
                pageSize: 25,
            }),
        });

    return (
        <Button onClick={resetFilters} variant="destructive" className="aspect-square">
            <RotateCcw className="size-3.5" />
        </Button>
    );
};
