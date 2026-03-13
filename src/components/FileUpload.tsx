import { Button } from '#/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '#/components/ui/field';
import { useAddTransaction } from '#/hooks/useAddTransaction';
import { useEffect, useRef, useState } from 'react';
import type { Bank } from 'txcategorizer';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '#/components/ui/select';
import { InputFile } from './ui/custom/input-file';
import { RotateCcw } from 'lucide-react';
import { useClearDb } from '#/hooks/useClearDb';

export const FileUpload = () => {
    const { mutate: uploadFile, isPending: uploadPending } = useAddTransaction();
    const { mutate: clearDb, isPending: clearPending } = useClearDb();

    const [file, setFile] = useState<File | null>(null);
    const [bank, setBank] = useState<Bank | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleFileReset = () => {
        setFile(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleBankChange = (value: Bank) => {
        setBank(value);
    };

    const handleFileUpload = () => {
        if (file && bank) uploadFile({ file, bank });
    };

    const handleClearDb = () => clearDb();

    return (
        <div
            id="upload-section"
            className="border-2 flex w-fit h-max p-12 min-w-96 self-center mx-auto flex-col gap-y-8 ring-foreground/10 bg-card text-card-foreground rounded-lg mt-8"
        >
            <Field>
                <FieldLabel>Last opp fil...</FieldLabel>
                <div className="flex gap-4">
                    <InputFile
                        file={file}
                        onChange={setFile}
                        accept=".csv,.txt"
                        className="w-full"
                    />
                    <Button
                        disabled={mounted ? Boolean(!file) : false}
                        variant="destructive"
                        onClick={handleFileReset}
                    >
                        <RotateCcw />
                    </Button>
                </div>

                <FieldDescription>.csv, .txt</FieldDescription>
            </Field>
            <Field>
                <FieldLabel>Velg bank...</FieldLabel>
                <Select onValueChange={handleBankChange}>
                    <SelectTrigger className="w-full cursor-pointer" id="bank-select">
                        <SelectValue placeholder="Bank..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="dnb">DNB</SelectItem>
                            <SelectItem value="valle">Valle</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FieldDescription>DNB, Valle</FieldDescription>
            </Field>
            <Button
                disabled={mounted ? Boolean(!file || !bank || uploadPending) : false}
                onClick={handleFileUpload}
            >
                {uploadPending ? 'Laster opp...' : 'Last opp'}
            </Button>
            <Button onClick={handleClearDb} disabled={mounted ? Boolean(clearPending) : false}>
                CLEAR
            </Button>
        </div>
    );
};
