import { Label } from '#/components/ui/label';
import { Switch } from '#/components/ui/switch';
import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/routes/dashboard';
import { SORT_FIELDS } from '#/types/transactions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@tanstack/react-router';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const SortDropdown = () => {
    const { sortBy, sortDir } = useSearch({ from: '/dashboard' });

    const [rotation, setRotation] = useState(sortDir === 'desc' ? 0 : 180);
    const navigate = useDashboardNavigate();

    const handleSortField = (value: string) => {
        const field = value.split(':')[0];
        navigate((prev: DashboardSearch) => ({
            ...prev,
            sortBy: field,
        }));
    };

    const handleSortDir = (switched: boolean) => {
        setRotation((r) => r + 180);
        navigate((prev: DashboardSearch) => ({
            ...prev,
            sortDir: switched ? 'asc' : 'desc',
        }));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-normal">
                    <ArrowUpDown className="size-3.5" />
                    <span>Sorter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Sorter etter...</DropdownMenuLabel>

                <DropdownMenuRadioGroup value={sortBy ?? 'date'} onValueChange={handleSortField}>
                    {Object.entries(SORT_FIELDS).flatMap(([k, v]) => (
                        <DropdownMenuRadioItem key={k} value={k}>
                            {v}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
                <div className="w-full flex justify-center items-center gap-2 my-3">
                    <Switch
                        size="sm"
                        checked={sortDir === 'asc'}
                        onCheckedChange={handleSortDir}
                        aria-label="Toggle sorting direction"
                        id="sort-dir-switch"
                    />
                    <Label htmlFor="sort-dir-switch">
                        <ChevronDown
                            size={14}
                            className="transition-transform duration-300 ease-in-out"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                    </Label>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
