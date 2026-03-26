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
import { useNavigate, useSearch } from '@tanstack/react-router';

export const PageSizeDropdown = () => {
    const { pageSize } = useSearch({ from: '/dashboard' });
    const navigate = useNavigate();

    const currentPageSize = pageSize.toString();
    const pageSizeOptions = [10, 25, 50, 75, 100];

    const handlePageSize = (value: string) =>
        navigate({
            to: '/dashboard',
            search: (prev: any) => ({
                ...prev,
                pageSize: value,
            }),
            resetScroll: false,
        });

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
