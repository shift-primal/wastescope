import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field';
import { useAddTransaction } from '#/hooks/useAddTransaction';
import type { Bank } from 'txcategorizer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '#/components/ui/select';
import { Input } from './ui/input';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useRef } from 'react';
import { InputFile } from './ui/custom/inputFile';

const banks = ['dnb', 'valle'] as const;

const formSchema = z.object({
    file: z.instanceof(File, { message: 'Velg en fil' }),
    bank: z.enum(banks),
    userName: z.string().min(3, 'Minst 3 karakterer').max(32, 'Max 32 karakterer'),
});

export const FileUploadForm = () => {
    const { mutate: uploadFile, isPending: uploadPending } = useAddTransaction();

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit({ value }: { value: { file: File; bank: Bank; userName: string } }) {
        uploadFile({ file: value.file, bank: value.bank, userName: value.userName });
        console.log(value);
        toast.success('Transactions imported!');
    }

    const form = useForm({
        defaultValues: {
            file: undefined as unknown as File,
            bank: '' as Bank,
            userName: '',
        },
        validators: {
            onBlur: formSchema,
        },
        onSubmit: async ({ value }) => handleSubmit({ value }),
    });

    return (
        <Card className="border-2 flex w-fit h-max p-12 min-w-96 self-center mx-auto flex-col gap-y-8 ring-foreground/10 bg-card text-card-foreground rounded-lg mt-8">
            <CardHeader>
                <CardTitle>Importer transaksjoner</CardTitle>
                <CardDescription>Kun (.csv) eller (.txt) filer</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="upload-form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="file"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid &&
                                    !!field.state.value;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Last opp fil...
                                        </FieldLabel>

                                        <InputFile inputRef={inputRef} field={field} />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="bank"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="pointer-events-none"
                                        >
                                            Velg bank...
                                        </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={(value) =>
                                                field.handleChange(value as Bank)
                                            }
                                            aria-invalid={isInvalid}
                                        >
                                            <SelectTrigger
                                                id={field.name}
                                                className="hover:cursor-pointer hover:bg-input/10"
                                            >
                                                <SelectValue placeholder="Bank..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dnb">DNB</SelectItem>
                                                <SelectItem value="valle">Valle</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="userName"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="pointer-events-none"
                                        >
                                            Navn...
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            className="hover:bg-input/10"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder="Ola Nordmann"
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <form.Subscribe
                selector={(state) => state.canSubmit && state.isDirty}
                children={(canSubmit) => (
                    <CardFooter>
                        <Field orientation="horizontal">
                            <Button
                                className="w-full"
                                type="submit"
                                form="upload-form"
                                disabled={!canSubmit || uploadPending}
                            >
                                Last opp
                            </Button>
                        </Field>
                    </CardFooter>
                )}
            />
        </Card>
    );
};
