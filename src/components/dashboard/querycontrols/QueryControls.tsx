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

export const QueryControls = ({ totalResults }: { totalResults: number }) => {
    const { minAmt, maxAmt, merchant } = useSearch({ from: '/dashboard' });
    const { data: amtBounds } = useAmtBounds();
    const { data: allUsers } = useUsers();

    return (
        <div id="query-controls-container" className="flex gap-x-4 py-2 min-w-max">
            {allUsers && <UserDropdown allUsers={allUsers} />}
            <CategoriesDropdown />
            <MerchantSearch key={merchant ?? ''} totalResults={totalResults} />
            <DatePicker />
            <SortDropdown />
            <ClearFiltersButton />
            {amtBounds && (
                <AmountRangeSlider key={`${minAmt ?? ''}-${maxAmt ?? ''}`} amtBounds={amtBounds} />
            )}
        </div>
    );
};
