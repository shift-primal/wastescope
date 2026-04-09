import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@tanstack/react-router';
import { LayoutList } from 'lucide-react';
import { CATEGORIES, type Category } from 'txcategorizer';

export const CategoriesDropdown = () => {
    const { category: selectedCategories } = useSearch({ from: '/dashboard' });
    const navigate = useDashboardNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-normal">
                    <LayoutList className="inline-start size-3.5" />
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
                            onCheckedChange={(checked) =>
                                navigate((prev: DashboardSearch) => ({
                                    ...prev,
                                    category: checked
                                        ? [...(prev.category ?? []), category]
                                        : (prev.category ?? []).filter(
                                              (c: Category) => c !== category,
                                          ),
                                }))
                            }
                        >
                            {category}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
