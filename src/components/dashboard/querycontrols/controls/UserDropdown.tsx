import { useDashboardNavigate } from '#/hooks/dashboard/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';
import type { User } from '#/db/schema';
import { getColorHex } from '#/db/schema';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@tanstack/react-router';
import { Users } from 'lucide-react';

export const UserDropdown = ({ allUsers }: { allUsers: User[] }) => {
    const { user: selectedUsers } = useSearch({ from: '/dashboard' });
    const navigate = useDashboardNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-normal">
                    <Users className="inline-start size-3.5" />
                    <span>Brukere</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Filtrer brukere</DropdownMenuLabel>
                    {allUsers.map((user) => (
                        <DropdownMenuCheckboxItem
                            key={user.name}
                            onSelect={(e) => e.preventDefault()}
                            checked={selectedUsers?.includes(user.name) ?? false}
                            onCheckedChange={(checked: boolean) => {
                                navigate((prev: DashboardSearch) => ({
                                    ...prev,
                                    user: checked
                                        ? [...(prev.user ?? []), user.name]
                                        : (prev.user ?? []).filter((c: string) => c !== user.name),
                                }));
                            }}
                        >
                            <span
                                className="inline-block size-2 rounded-full shrink-0"
                                style={{ backgroundColor: getColorHex(user.color) }}
                            />
                            {user.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
