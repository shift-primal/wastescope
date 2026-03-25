import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export const MerchantSearch = ({ totalResults }: { totalResults: number }) => {
    const navigate = useNavigate();
    const { merchant } = useSearch({ from: '/dashboard' });
    const [value, setValue] = useState(merchant ?? '');

    useEffect(() => {
        setValue(merchant ?? '');
    }, [merchant]);

    const handleSearch = useDebouncedCallback(
        (val: string) =>
            navigate({
                to: '/dashboard',
                search: (prev: any) => ({
                    ...prev,
                    merchant: val || undefined,
                }),
                resetScroll: false,
            }),
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
            <InputGroupAddon align="inline-end">{totalResults} rader</InputGroupAddon>
        </InputGroup>
    );
};
