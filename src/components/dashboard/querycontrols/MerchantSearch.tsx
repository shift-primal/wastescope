import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useNavigate } from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export const MerchantSearch = ({ total }: { total: number }) => {
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
        100,
    );

    return (
        <InputGroup className="max-w-xs">
            <InputGroupInput
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{total} results</InputGroupAddon>
        </InputGroup>
    );
};
