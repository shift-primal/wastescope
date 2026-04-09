import { Slider } from '#/components/ui/slider';
import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';
import { useSearch } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const AmountRangeSlider = ({
    amtBounds,
}: {
    amtBounds: { minBound: number; maxBound: number };
}) => {
    const { minAmt, maxAmt } = useSearch({ from: '/dashboard' });
    const { minBound, maxBound } = amtBounds;
    const navigate = useDashboardNavigate();

    const [localValue, setLocalValue] = useState([minAmt || minBound, maxAmt || maxBound]);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const wasDragging = useRef(false);

    const handleChange = useDebouncedCallback((values: number[]) => {
        navigate((prev: DashboardSearch) => ({ ...prev, minAmt: values[0], maxAmt: values[1] }));
    }, 300);

    return (
        <Slider
            value={localValue}
            min={minBound}
            max={maxBound}
            step={100}
            minStepsBetweenThumbs={1}
            activeThumb={activeThumb}
            instant={wasDragging.current}
            onValueChange={(values) => {
                const newIndex = values.findIndex((v, i) => v !== localValue[i]);
                if (newIndex !== -1) {
                    wasDragging.current = activeThumb !== null;
                    setActiveThumb(newIndex);
                }
                setLocalValue(values);
                handleChange(values);
            }}
            onValueCommit={() => setActiveThumb(null)}
            customThumb
        />
    );
};
