import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { LayoutList } from 'lucide-react';

import { CATEGORIES } from 'txcategorizer';

export const CategoriesDropdown = () => {
    const { category: selectedCategories } = useSearch({ from: '/dashboard' });
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <LayoutList className="inline-start" />
                    <span>Kategorier</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Filtrer kategorier</DropdownMenuLabel>
                    {CATEGORIES.map((category) => (
                        <DropdownMenuCheckboxItem
                            key={category}
                            onSelect={(e) => e.preventDefault()}
                            checked={selectedCategories?.includes(category) ?? false}
                            onCheckedChange={(checked: boolean) => {
                                navigate({
                                    to: '/dashboard',
                                    search: (prev: any) => ({
                                        ...prev,
                                        category: checked
                                            ? [...(prev.category ?? []), category]
                                            : (prev.category ?? []).filter(
                                                  (c: string) => c !== category,
                                              ),
                                    }),
                                    resetScroll: false,
                                });
                            }}
                        >
                            {category}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
