import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useNavigate } from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export const MerchantSearch = ({ totalResults }: { totalResults: number }) => {
    const navigate = useNavigate();
    const handleSearch = useDebouncedCallback(
        (value: string) =>
            navigate({
                to: '/dashboard',
                search: (prev: any) => ({
                    ...prev,
                    merchant: value,
                }),
                resetScroll: false,
            }),
        300,
    );

    return (
        <InputGroup>
            <InputGroupInput placeholder="Søk..." onChange={(e) => handleSearch(e.target.value)} />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{totalResults} rader</InputGroupAddon>
        </InputGroup>
    );
};
