import { Button } from '#/components/ui/button';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageSizeDropdown } from './PageSizeDropdown';

export const PageControls = () => {
    const { page } = useSearch({ from: '/dashboard' });
    const navigate = useNavigate();

    const handleNext = () =>
        navigate({
            to: '/dashboard',
            search: (prev: any) => ({
                ...prev,
                page: page + 1,
            }),
            resetScroll: false,
        });

    const handlePrev = () =>
        navigate({
            to: '/dashboard',
            search: (prev: any) => ({
                ...prev,
                page: page - 1,
            }),
            resetScroll: false,
        });

    return (
        <div className="flex gap-x-2">
            <Button
                variant="ghost"
                aria-label="Go to previous page"
                size="default"
                className="gap-1 px-2.5 sm:pl-2.5"
                onClick={handlePrev}
            >
                <ChevronLeft />
                <span className="hidden sm:block">Previous</span>
            </Button>

            <PageSizeDropdown />

            <Button
                variant="ghost"
                aria-label="Go to next page"
                size="default"
                className="gap-1 px-2.5 sm:pr-2.5"
                onClick={handleNext}
            >
                <span className="hidden sm:block">Next</span>
                <ChevronRight />
            </Button>
        </div>
    );
};
