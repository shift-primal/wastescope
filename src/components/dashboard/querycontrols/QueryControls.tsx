import { useAmtBounds } from '#/hooks/useAmtBounds';
import { useUsers } from '#/hooks/useUsers';
import { useSearch } from '@tanstack/react-router';
import { AmountRangeSlider } from './controls/AmountRangeSlider';
import { CategoriesDropdown } from './controls/CategoriesDropdown';
import { ClearFiltersButton } from './controls/ClearFiltersButton';
import { DatePicker } from './controls/DatePicker';
import { MerchantSearch } from './controls/MerchantSearch';
import { SortDropdown } from './controls/SortDropdown';
import { UserDropdown } from './controls/UserDropdown';
import { Separator } from '#/components/ui/separator';

export const QueryControls = () => {
    const { minAmt, maxAmt, merchant } = useSearch({ from: '/dashboard' });
    const { data: amtBounds } = useAmtBounds();
    const { data: allUsers } = useUsers();

    return (
        <div id="query-controls-container" className="flex flex-col gap-y-3 py-2 w-full">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-x-3 w-full">
                <div className="grid grid-cols-2 md:flex gap-2 md:shrink-0">
                    {allUsers && <UserDropdown allUsers={allUsers} />}
                    <CategoriesDropdown />
                </div>
                <Separator orientation="vertical" className="hidden md:block min-h-8 shrink-0" />
                <div className="grid grid-cols-2 md:contents gap-2 w-full">
                    <div className="flex-1 min-w-0">
                        <MerchantSearch key={merchant ?? ''} />
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden md:block min-h-8 shrink-0"
                    />
                    <DatePicker />
                </div>
                <Separator orientation="vertical" className="hidden md:block min-h-8 shrink-0" />
                <div className="flex gap-2 md:shrink-0">
                    <div className="flex-1 md:flex-none">
                        <SortDropdown />
                    </div>
                    <ClearFiltersButton />
                </div>
            </div>
            <div className="px-4">
                {amtBounds && (
                    <AmountRangeSlider
                        key={`${minAmt ?? ''}-${maxAmt ?? ''}`}
                        amtBounds={amtBounds}
                    />
                )}
            </div>
        </div>
    );
};
