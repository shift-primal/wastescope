import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '#/lib/utils';
import { useSearch } from '@tanstack/react-router';
import { format as fmtDate, endOfMonth, startOfMonth } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];

export const DatePicker = () => {
    const { from: fromStr, to: toStr } = useSearch({ from: '/dashboard' });
    const navigate = useDashboardNavigate();

    const from = new Date(fromStr);
    const to = new Date(toStr);

    const [year, setYear] = useState(from.getFullYear());

    const handleSelect = (monthIndex: number) => {
        const selected = new Date(year, monthIndex, 1);
        const fromMonth = startOfMonth(from);
        const toMonth = startOfMonth(to);

        if (selected < fromMonth || (selected >= fromMonth && selected <= toMonth)) {
            navigate((prev: DashboardSearch) => ({
                ...prev,
                from: fmtDate(startOfMonth(selected), 'yyyy-MM-dd'),
                to: fmtDate(endOfMonth(selected), 'yyyy-MM-dd'),
            }));
        } else {
            navigate((prev: DashboardSearch) => ({
                ...prev,
                to: fmtDate(endOfMonth(selected), 'yyyy-MM-dd'),
            }));
        }
    };

    const isStart = (monthIndex: number) =>
        year === from.getFullYear() && monthIndex === from.getMonth();

    const isEnd = (monthIndex: number) => year === to.getFullYear() && monthIndex === to.getMonth();

    const isInRange = (monthIndex: number) => {
        const d = new Date(year, monthIndex, 1);
        return d > startOfMonth(from) && d < startOfMonth(to);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start px-2.5 font-normal w-full md:w-auto">
                    <CalendarIcon className="size-3.5" />
                    <span className="text-center w-full sm:hidden">
                        {fmtDate(from, 'LLL yy')} – {fmtDate(to, 'LLL yy')}
                    </span>
                    <span className="text-center w-full hidden sm:inline">
                        {fmtDate(from, 'LLL y')} – {fmtDate(to, 'LLL y')}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-3" align="start">
                <div className="flex items-center justify-between mb-3">
                    <Button variant="ghost" size="icon" onClick={() => setYear((y) => y - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{year}</span>
                    <Button variant="ghost" size="icon" onClick={() => setYear((y) => y + 1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {MONTHS.map((name, i) => (
                        <button
                            key={name}
                            onClick={() => handleSelect(i)}
                            className={cn(
                                'rounded-md py-1.5 text-sm transition-colors hover:bg-accent cursor-pointer',
                                isInRange(i) && 'bg-accent',
                                (isStart(i) || isEnd(i)) &&
                                    'bg-primary text-primary-foreground hover:bg-primary',
                            )}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
