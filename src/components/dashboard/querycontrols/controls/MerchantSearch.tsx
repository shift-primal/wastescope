import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useSearch } from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDashboardNavigate } from '#/hooks/dashboard/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';

export const MerchantSearch = () => {
    const navigate = useDashboardNavigate();
    const { merchant } = useSearch({ from: '/dashboard' });
    const [value, setValue] = useState(merchant ?? '');

    const handleSearch = useDebouncedCallback(
        (val: string) =>
            navigate((prev: DashboardSearch) => ({
                ...prev,
                merchant: val || undefined,
            })),
        300,
    );

    return (
        <InputGroup>
            <InputGroupInput
                placeholder="Søk..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    handleSearch(e.target.value);
                }}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};
