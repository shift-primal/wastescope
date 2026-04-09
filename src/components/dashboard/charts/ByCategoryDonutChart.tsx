import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { CategoryStat } from '#/types/transactions';
import { catToKey, parseAmt } from '#/lib/tableUtils';

export const ByCategoryDonutChart = ({ data }: { data: CategoryStat[] }) => {
    const chartConfig = {
        total: { label: 'Beløp' },
        ...Object.fromEntries(
            data.map((d, i) => [
                catToKey(d.category),
                { label: d.category, color: `var(--chart-${(i % 5) + 1})` },
            ]),
        ),
    } satisfies ChartConfig;

    const chartData = data.map((d) => ({
        category: d.category,
        total: parseAmt(d.total),
        fill: `var(--color-${catToKey(d.category)})`,
    }));

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Utgifter pr. kategori</CardTitle>
                <CardDescription>Kun utgifter (negative transaksjoner)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="h-48 w-full">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel className="text-center" />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="category"
                            innerRadius={40}
                            minAngle={5}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
