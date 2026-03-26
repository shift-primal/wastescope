import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/routes/dashboard';
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

export const UserDropdown = ({ allUsers }: { allUsers: string[] }) => {
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
                            key={user}
                            onSelect={(e) => e.preventDefault()}
                            checked={selectedUsers?.includes(user) ?? false}
                            onCheckedChange={(checked: boolean) => {
                                navigate((prev: DashboardSearch) => ({
                                    ...prev,
                                    user: checked
                                        ? [...(prev.user ?? []), user]
                                        : (prev.user ?? []).filter((c: string) => c !== user),
                                }));
                            }}
                        >
                            {user}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
