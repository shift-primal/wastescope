import type { CategoryStat, MonthlyStat } from '#/types/transactions';
import { ByCategoryDonutChart } from './ByCategoryDonutChart';
import { ByMonthAreaChart } from './ByMonthAreaChart';

export const DataCharts = ({
    monthlyStats,
    categoryStats,
}: {
    monthlyStats: MonthlyStat[];
    categoryStats: CategoryStat[];
}) => {
    return (
        <div id="charts" className="flex flex-col md:flex-row w-full gap-4 md:gap-x-8">
            <ByMonthAreaChart data={monthlyStats} />
            <ByCategoryDonutChart data={categoryStats} />
        </div>
    );
};
