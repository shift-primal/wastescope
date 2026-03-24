import { useAmtBounds } from '#/hooks/useAmtBounds';
import { AmountRangeSlider } from './AmountRangeSlider';
import { CategoriesDropdown } from './CategoriesDropdown';
import { ClearFiltersButton } from './ClearFiltersButton';
import { DatePicker } from './DatePicker';
import { MerchantSearch } from './MerchantSearch';
import { SortDropdown } from './SortDropdown';

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
