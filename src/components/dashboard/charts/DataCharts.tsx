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
        <div id="charts" className="flex justify-between w-full gap-x-8">
            <ByMonthAreaChart data={monthlyStats} />
            <ByCategoryDonutChart data={categoryStats} />
        </div>
    );
};
