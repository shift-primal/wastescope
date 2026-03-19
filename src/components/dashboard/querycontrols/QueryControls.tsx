import { CategoriesDropdown } from './CategoriesDropdown';
import { DatePicker } from './DatePicker';
import { MerchantSearch } from './MerchantSearch';

export const QueryControls = ({ total }: { total: number }) => {
    return (
        <div id="query-controls-container" className="flex">
            <CategoriesDropdown />
            <MerchantSearch total={total} />
            <DatePicker />
        </div>
    );
};
