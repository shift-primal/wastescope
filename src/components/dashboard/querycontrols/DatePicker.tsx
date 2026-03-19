import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

export const DatePicker = () => {
    const { from: fromDate, to: toDate } = useSearch({ from: '/dashboard' });
    const navigate = useNavigate();

    const date: DateRange = { from: new Date(fromDate), to: new Date(toDate) };

    const handleDateChange = ({ from, to }: { from: Date; to: Date }) =>
        navigate({
            to: '/dashboard',
            search: (prev: any) => ({
                ...prev,
                from: from,
                to: to,
            }),
            resetScroll: false,
        });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal"
                >
                    <CalendarIcon />
                    {date.from ? (
                        date.to ? (
                            <span>
                                <span>{format(date.from, 'LLL, y')}</span> -
                                <span>{format(date.to, 'LLL, y')}</span>
                            </span>
                        ) : (
                            format(date.from, 'LLL, y')
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(range: DateRange | undefined) => {
                        if (range?.from && range?.to)
                            handleDateChange({ from: range.from, to: range.to });
                    }}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
};
