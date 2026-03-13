import { useRef } from 'react';
import { cn } from '#/lib/utils';

interface InputFileProps {
    file: File | null;
    onChange: (file: File | null) => void;
    className?: string;
    accept?: string;
}

export const InputFile = ({ file, onChange, className, accept }: InputFileProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
            <button
                type="button"
                data-slot="input"
                className={cn(
                    'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none text-left md:text-sm dark:bg-input/30',
                    'dark:hover:bg-input/50 cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    className,
                )}
                onClick={() => inputRef.current?.click()}
            >
                {file ? file.name : 'Velg fil...'}
            </button>
        </>
    );
};
