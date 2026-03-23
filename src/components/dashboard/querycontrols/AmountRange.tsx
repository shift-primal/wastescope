import { Slider } from '#/components/ui/slider';
import { useAmtBounds } from '#/hooks/useAmtBounds';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const AmountRange = () => {
    const { minAmt: minStr, maxAmt: maxStr } = useSearch({ from: '/dashboard' });
    const { data } = useAmtBounds();
    const navigate = useNavigate();

    const [minBound, maxBound, minAmt, maxAmt] = [
        data?.minBound,
        data?.maxBound,
        minStr,
        maxStr,
    ].map((v) => parseFloat(v ?? '0'));

    const [localValue, setLocalValue] = useState([minAmt, maxAmt]);

    const handleChange = useDebouncedCallback((values: number[]) => {
        navigate({
            to: '/dashboard',
            search: (prev: any) => ({ ...prev, minAmt: values[0], maxAmt: values[1] }),
            resetScroll: false,
        });
    }, 300);

    if (!data) return null;

    return (
        <Slider
            value={localValue}
            min={minBound}
            max={maxBound}
            step={100}
            onValueChange={setLocalValue}
            onValueCommit={(values) => {
                handleChange(values);
            }}
            className="mx-auto w-full max-w-xs"
        />
    );
};
