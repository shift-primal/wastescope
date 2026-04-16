import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { MonthlyStatByUser } from '#/types/transactions';
import { formatDate as fmtDate } from 'date-fns';
import { parseAmt, catToKey } from '#/lib/tableUtils';
import { useUsers } from '#/hooks/user/useUsers';
import { getColorHex } from '#/db/schema';

export const ByMonthAreaChart = ({
    byUserData,
    incomeOnly = false,
}: {
    byUserData: MonthlyStatByUser[];
    incomeOnly?: boolean;
}) => {
    const { data: users } = useUsers();
    const colorMap = Object.fromEntries(users?.map((u) => [u.name, u.color]) ?? []);

    const label = incomeOnly ? 'Inntekt' : 'Utgifter';

    const allMonths = [...new Set(byUserData.map((d) => d.month))].sort();
    const allUsers = [...new Set(byUserData.map((d) => d.user))];

    const chartData = allMonths.map((month) => {
        const row: Record<string, string | number> = { month };
        allUsers.forEach((user) => {
            const entry = byUserData.find((d) => d.month === month && d.user === user);
            row[catToKey(user)] = entry ? parseAmt(entry.total) : 0;
        });
        return row;
    });

    const chartConfig = Object.fromEntries(
        allUsers.map((user) => [
            catToKey(user),
            { label: user, color: getColorHex(colorMap[user]) },
        ]),
    ) satisfies ChartConfig;

    return (
        <Card className="pt-0 w-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>{label} pr. måned</CardTitle>
                    <CardDescription>Per person</CardDescription>
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
                        {allUsers.map((user) => (
                            <Area
                                key={user}
                                dataKey={catToKey(user)}
                                type="natural"
                                fill={`var(--color-${catToKey(user)})`}
                                fillOpacity={0.3}
                                stroke={`var(--color-${catToKey(user)})`}
                                stackId="a"
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
