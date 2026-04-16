import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { CategoryStat, UserStat } from '#/types/transactions';
import { catToKey, parseAmt } from '#/lib/tableUtils';
import { useUsers } from '#/hooks/user/useUsers';
import { getColorHex } from '#/db/schema';
import type React from 'react';

function forwardTouchAsMouseMove(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    const svg = e.currentTarget.querySelector('svg');
    if (!svg) return;
    svg.dispatchEvent(
        new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
        }),
    );
}

export const ByCategoryDonutChart = ({
    data,
    userStats,
    incomeOnly = false,
}: {
    data: CategoryStat[];
    userStats?: UserStat[];
    incomeOnly?: boolean;
}) => {
    const { data: users } = useUsers();
    const colorMap = Object.fromEntries(users?.map((u) => [u.name, u.color]) ?? []);

    // personmode (inntekt)
    if (userStats && userStats.length > 0) {
        const chartConfig = {
            total: { label: 'Beløp' },
            ...Object.fromEntries(
                userStats.map((d) => [
                    catToKey(d.user),
                    { label: d.user, color: getColorHex(colorMap[d.user]) },
                ]),
            ),
        } satisfies ChartConfig;

        const chartData = userStats.map((d) => ({
            user: d.user,
            total: parseAmt(d.total),
            fill: getColorHex(colorMap[d.user]),
        }));

        return (
            <Card className="flex flex-col w-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Inntekt pr. person</CardTitle>
                    <CardDescription>Kun inntekt (positive transaksjoner)</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div onTouchStart={forwardTouchAsMouseMove}>
                        <ChartContainer config={chartConfig} className="h-48 w-full">
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="total"
                                    nameKey="user"
                                    innerRadius={40}
                                    minAngle={5}
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // categorymode
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
                <CardTitle>{incomeOnly ? 'Inntekt' : 'Utgifter'} pr. kategori</CardTitle>
                <CardDescription>
                    {incomeOnly
                        ? 'Kun inntekt (positive transaksjoner)'
                        : 'Kun utgifter (negative transaksjoner)'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div onTouchStart={forwardTouchAsMouseMove}>
                    <ChartContainer config={chartConfig} className="h-48 w-full">
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
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
                </div>
            </CardContent>
        </Card>
    );
};
