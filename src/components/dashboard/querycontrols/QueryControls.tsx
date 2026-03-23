import { AmountRange } from './AmountRange';
import { CategoriesDropdown } from './CategoriesDropdown';
import { ClearFiltersButton } from './ClearFiltersButton';
import { DatePicker } from './DatePicker';
import { MerchantSearch } from './MerchantSearch';
import { SortDropdown } from './SortDropdown';

export const QueryControls = ({ totalResults }: { totalResults: number }) => {
    return (
        <div id="query-controls-container" className="flex gap-x-4 py-2">
            <CategoriesDropdown />
            <MerchantSearch totalResults={totalResults} />
            <DatePicker />
            <SortDropdown />
            <ClearFiltersButton />
            <AmountRange />
        </div>
    );
};
