import type { AnyFieldApi } from '@tanstack/react-form';
import { cn } from '#/lib/utils';
import { RotateCcw } from 'lucide-react';
import { Button } from '../button';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

type Props = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    field: AnyFieldApi;
};

export const InputFile = ({ inputRef, field }: Props) => {
    function clearFile() {
        field.setValue(undefined as unknown as File);
        field.setMeta((prev) => ({ ...prev, isTouched: false, isDirty: false }));
    }

    return (
        <div id="file-selection" className="flex flex-col gap-y-1">
        <div className="flex gap-x-4">
            <input
                ref={inputRef}
                type="file"
                id={field.name}
                accept=".csv,.txt"
                className="hidden"
                onChange={(e) => field.handleChange(e.target.files?.[0])}
            />
            <Tooltip>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className={cn(
                        ' w-full min-w-0 rounded-md  border-input bg-transparent px-3 py-1  shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground inline-flex h-9 border text-sm font-medium items-center text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
                        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:hover:bg-input/50 hover:cursor-pointer hover:bg-input/10',
                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                    )}
                >
                    {(field.state.value as File)?.name ?? 'Velg fil...'}
                </button>
                <TooltipTrigger asChild>
                    <Button
                        variant="destructive"
                        onClick={() => clearFile()}
                        disabled={!field.state.value}
                    >
                        <RotateCcw />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Reset fil...</TooltipContent>
            </Tooltip>
        </div>
        <span className="text-xs text-muted-foreground">.csv eller .txt</span>
        </div>
    );
};
