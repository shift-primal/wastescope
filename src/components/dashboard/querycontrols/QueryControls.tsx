import { useAmtBounds } from '#/hooks/useAmtBounds';
import { AmountRangeSlider } from './controls/AmountRangeSlider';
import { CategoriesDropdown } from './controls/CategoriesDropdown';
import { ClearFiltersButton } from './controls/ClearFiltersButton';
import { DatePicker } from './controls/DatePicker';
import { MerchantSearch } from './controls/MerchantSearch';
import { SortDropdown } from './controls/SortDropdown';

export const QueryControls = ({ totalResults }: { totalResults: number }) => {
    const { data: amtBounds } = useAmtBounds();

    return (
        <div id="query-controls-container" className="flex gap-x-4 py-2">
            <CategoriesDropdown />
            <MerchantSearch totalResults={totalResults} />
            <DatePicker />
            <SortDropdown />
            <ClearFiltersButton />
            {amtBounds && <AmountRangeSlider amtBounds={amtBounds} />}
        </div>
    );
};
