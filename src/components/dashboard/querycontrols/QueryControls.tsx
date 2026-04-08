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
        <div id="query-controls-container" className="flex flex-col gap-y-4 py-2 w-full">
            <div
                className="flex justify-between items-center
				gap-x-6"
            >
                <div className="flex gap-x-3">
                    {allUsers && <UserDropdown allUsers={allUsers} />}
                    <CategoriesDropdown />
                </div>
                <Separator orientation="vertical" className="min-h-8" />
                <MerchantSearch key={merchant ?? ''} />
                <Separator orientation="vertical" className="min-h-8" />
                <DatePicker />
                <Separator orientation="vertical" className="min-h-8" />
                <div className="flex gap-x-3">
                    <SortDropdown />
                    <ClearFiltersButton />
                </div>
            </div>
            {amtBounds && (
                <AmountRangeSlider key={`${minAmt ?? ''}-${maxAmt ?? ''}`} amtBounds={amtBounds} />
            )}
        </div>
    );
};
