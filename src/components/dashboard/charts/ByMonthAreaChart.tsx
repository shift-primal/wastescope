import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { MonthlyStat } from '#/types/transactions';
import { formatDate as fmtDate } from 'date-fns';
import { parseAmt } from '#/lib/tableUtils';

export const ByMonthAreaChart = ({ data }: { data: MonthlyStat[] }) => {
    const chartConfig = {
        total: {
            label: 'Utgifter',
            color: 'var(--chart-3)',
        },
    } satisfies ChartConfig;

    const chartData = data.map((d) => ({
        month: d.month,
        total: parseAmt(d.total),
    }));

    return (
        <Card className="pt-0 w-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Total mengde pr. mnd</CardTitle>
                    <CardDescription>Viser total mengde for valgte transaksjoner</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="h-48 w-full">
                    <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval={0}
                            tickFormatter={(value) => fmtDate(value, 'LLL')}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelFormatter={(value) => fmtDate(value, 'LLL yyyy')}
                                />
                            }
                        />
                        <Area
                            dataKey="total"
                            type="natural"
                            fill="var(--color-total)"
                            fillOpacity={0.4}
                            stroke="var(--color-total)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
