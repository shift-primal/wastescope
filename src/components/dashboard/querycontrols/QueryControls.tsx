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

export const QueryControls = () => {
    const { minAmt, maxAmt, merchant } = useSearch({ from: '/dashboard' });
    const { data: amtBounds } = useAmtBounds();
    const { data: allUsers } = useUsers();

    return (
        <div id="query-controls-container" className="flex flex-col gap-y-4 py-2">
            <div className="flex divide-x divide-border">
                <div className="flex gap-x-3 pr-6">
                    {allUsers && <UserDropdown allUsers={allUsers} />}
                    <CategoriesDropdown />
                </div>
                <div className="px-6">
                    <MerchantSearch key={merchant ?? ''} />
                </div>
                <div className="px-6">
                    <DatePicker />
                </div>
                <div className="flex gap-x-3 pl-6">
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
