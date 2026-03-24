import * as React from 'react';
import { cn } from '#/lib/utils';
import { Badge } from '../badge';

export const SliderBadge = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & { value: number; isActive?: boolean; isDragging?: boolean }
>(({ value, isActive, isDragging, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className="group block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 relative"
        >
            <Badge
                className={cn(
                    'origin-top absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none',
                    isActive
                        ? 'scale-100 transition-transform duration-200 ease-in-out'
                        : isDragging
                          ? 'scale-0'
                          : 'scale-0 group-hover:scale-100 group-hover:transition-transform group-hover:duration-200 group-hover:ease-in-out',
                )}
            >
                {value}
            </Badge>
        </div>
    );
});
