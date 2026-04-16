import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '#/lib/utils';
import { Badge } from '#/components/ui/badge';

type TrackSegment = { fromPct: number; toPct: number; className: string };

const ThumbWithBadge = ({
    value,
    isActive,
    isDragging,
    instant,
    formatValue,
}: {
    value: number;
    isActive: boolean;
    isDragging: boolean;
    instant: boolean;
    formatValue?: (val: number) => string;
}) => (
    <SliderPrimitive.Thumb className="group block size-4 shrink-0 rounded-full border border-accent bg-white shadow-md ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 relative">
        <Badge
            className={cn(
                'origin-top absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap',
                isActive && 'scale-100',
                isActive && !instant && 'transition-transform duration-200 ease-in-out',
                !isActive && isDragging && 'scale-0',
                !isActive &&
                    !isDragging &&
                    'scale-0 group-hover:scale-100 group-hover:transition-transform group-hover:duration-200 group-hover:ease-in-out',
            )}
        >
            {formatValue ? formatValue(value) : value}
        </Badge>
    </SliderPrimitive.Thumb>
);

function Slider({
    className,
    defaultValue,
    value,
    min = 0,
    max = 100,
    customThumb = false,
    activeThumb = null,
    instant = false,
    trackSegments,
    formatValue,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
    customThumb?: boolean;
    activeThumb?: number | null;
    instant?: boolean;
    trackSegments?: TrackSegment[];
    formatValue?: (val: number) => string;
}) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
        [value, defaultValue, min, max],
    );

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(
                        'absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
                        trackSegments ? 'opacity-0' : 'bg-primary',
                    )}
                />
                {trackSegments?.map((seg, i) => (
                    <div
                        key={i}
                        className={cn('absolute h-full', seg.className)}
                        style={{ left: `${seg.fromPct}%`, width: `${seg.toPct - seg.fromPct}%` }}
                    />
                ))}
                {trackSegments && (
                    <div
                        className="absolute h-full w-0.5 -translate-x-1/2 bg-muted-foreground/40"
                        style={{ left: '50%' }}
                    />
                )}
            </SliderPrimitive.Track>
            {_values.map((val, index) =>
                customThumb ? (
                    <ThumbWithBadge
                        key={index}
                        value={val}
                        isActive={activeThumb === index}
                        isDragging={activeThumb !== null}
                        instant={instant}
                        formatValue={formatValue}
                    />
                ) : (
                    <SliderPrimitive.Thumb
                        data-slot="slider-thumb"
                        key={index}
                        className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                    />
                ),
            )}
        </SliderPrimitive.Root>
    );
}

export { Slider };
