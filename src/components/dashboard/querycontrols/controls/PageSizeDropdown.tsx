import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@tanstack/react-router';

export const PageSizeDropdown = () => {
    const { pageSize } = useSearch({ from: '/dashboard' });
    const navigate = useDashboardNavigate();

    const currentPageSize = pageSize.toString();
    const pageSizeOptions = [10, 25, 50, 75, 100];

    const handlePageSize = (value: string) => {
        const newPageSize = Number(value);
        navigate((prev: DashboardSearch) => ({
            ...prev,
            pageSize: newPageSize,
        }));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{currentPageSize}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Page Size</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={currentPageSize ?? '25'}
                        onValueChange={handlePageSize}
                    >
                        {pageSizeOptions.map((sz) => (
                            <DropdownMenuRadioItem key={sz} value={sz.toString()}>
                                {sz}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
