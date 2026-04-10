import { useForm } from '@tanstack/react-form';
import { useRef } from 'react';
import { toast } from 'sonner';
import type { Bank } from 'txcategorizer';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '#/components/ui/select';
import { useAddTransaction } from '#/hooks/useAddTransaction';
import { Button } from '#/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
} from '#/components/ui/card';
import { InputFile } from '#/components/ui/custom/InputFile';
import { useUsers } from '#/hooks/useUsers';
import { CreateNewUser } from './CreateNewUser';
import { uploadFormSchema } from '#/lib/validators';

export const FileUploadForm = () => {
    const { mutate: uploadFile, isPending: uploadPending } = useAddTransaction();

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit({ value }: { value: { file: File; bank: Bank; user: string } }) {
        uploadFile(
            { file: value.file, bank: value.bank, user: value.user },
            {
                onSuccess: () => toast.success('Fil importert!'),
                onError: () => toast.error('Noe gikk galt.'),
            },
        );
    }

    const form = useForm({
        defaultValues: {
            file: undefined as unknown as File,
            bank: '' as Bank,
            user: '',
        },
        validators: {
            onSubmit: uploadFormSchema,
        },
        onSubmit: async ({ value }) => handleSubmit({ value }),
    });

    const { data: users } = useUsers();

    return (
        <Card className="border-2 flex w-full sm:w-fit h-max p-6 sm:p-10 sm:min-w-96 self-center mx-auto flex-col gap-y-6 ring-foreground/10 bg-card text-card-foreground rounded-lg">
            <CardContent className="p-0">
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
                            name="user"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="pointer-events-none"
                                        >
                                            Velg bruker...
                                        </FieldLabel>
                                        <div className="flex gap-x-4 justify-between">
                                            <Select
                                                name={field.name}
                                                value={field.state.value}
                                                onValueChange={(value) =>
                                                    field.handleChange(value as string)
                                                }
                                                aria-invalid={isInvalid}
                                            >
                                                <SelectTrigger
                                                    id={field.name}
                                                    className="hover:cursor-pointer hover:bg-input/10 w-full"
                                                >
                                                    <SelectValue placeholder="Ola Nordmann..." />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    {users?.length ? (
                                                        users.map((user) => (
                                                            <SelectItem
                                                                key={user.name}
                                                                value={user.name}
                                                            >
                                                                {user.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="py-2 px-3 text-sm text-muted-foreground">
                                                            Ingen brukere funnet
                                                        </div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <CreateNewUser />
                                        </div>
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
                    <CardFooter className="p-0 pt-2">
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
