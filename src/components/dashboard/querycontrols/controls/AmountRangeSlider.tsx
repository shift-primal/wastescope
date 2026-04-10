import { Slider } from '#/components/ui/slider';
import { useDashboardNavigate } from '#/hooks/useDashboardNavigate';
import type { DashboardSearch } from '#/types/transactions';
import { useSearch } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// Maps a real value to [0, 1000] slider space, 0 always at 500.
// Each side independently scales to its bound.
function toSlider(value: number, minBound: number, maxBound: number): number {
    if (value <= 0) return 500 + (value / Math.abs(minBound || 1)) * 500;
    return 500 + (value / (maxBound || 1)) * 500;
}

// Maps [0, 1000] slider position back to real value.
function fromSlider(pos: number, minBound: number, maxBound: number): number {
    if (pos <= 500) return ((pos - 500) / 500) * Math.abs(minBound || 1);
    return ((pos - 500) / 500) * (maxBound || 1);
}

function formatBadge(sliderVal: number, minBound: number, maxBound: number): string {
    const real = Math.round(fromSlider(sliderVal, minBound, maxBound) / 100) * 100;
    if (real === 0) return '0 kr';
    return `${real > 0 ? '+' : ''}${real.toLocaleString('no')} kr`;
}

export const AmountRangeSlider = ({
    amtBounds,
}: {
    amtBounds: { minBound: number; maxBound: number };
}) => {
    const { minAmt, maxAmt } = useSearch({ from: '/dashboard' });
    const { minBound, maxBound } = amtBounds;
    const navigate = useDashboardNavigate();

    const [sliderValue, setSliderValue] = useState([
        toSlider(minAmt ?? minBound, minBound, maxBound),
        toSlider(maxAmt ?? maxBound, minBound, maxBound),
    ]);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const wasDragging = useRef(false);

    const handleChange = useDebouncedCallback((sliderVals: number[]) => {
        navigate((prev: DashboardSearch) => ({
            ...prev,
            minAmt: Math.round(fromSlider(sliderVals[0], minBound, maxBound)),
            maxAmt: Math.round(fromSlider(sliderVals[1], minBound, maxBound)),
        }));
    }, 300);

    const [sMin, sMax] = sliderValue;

    const trackSegments = [
        // Red: selected negative range
        ...(sMin < 500
            ? [{ fromPct: (sMin / 1000) * 100, toPct: (Math.min(sMax, 500) / 1000) * 100, className: 'bg-destructive/70' }]
            : []),
        // Green: selected positive range
        ...(sMax > 500
            ? [{ fromPct: (Math.max(sMin, 500) / 1000) * 100, toPct: (sMax / 1000) * 100, className: 'bg-green-500/70' }]
            : []),
    ];

    return (
        <Slider
            value={sliderValue}
            min={0}
            max={1000}
            step={1}
            minStepsBetweenThumbs={1}
            activeThumb={activeThumb}
            instant={wasDragging.current}
            trackSegments={trackSegments}
            formatValue={(v) => formatBadge(v, minBound, maxBound)}
            onValueChange={(values) => {
                const newIndex = values.findIndex((v, i) => v !== sliderValue[i]);
                if (newIndex !== -1) {
                    wasDragging.current = activeThumb !== null;
                    setActiveThumb(newIndex);
                }
                setSliderValue(values);
                handleChange(values);
            }}
            onValueCommit={() => setActiveThumb(null)}
            customThumb
        />
    );
};
