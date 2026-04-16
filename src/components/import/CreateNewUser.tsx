import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useAddUser } from '#/hooks/user/useAddUser';
import { COLOR_OPTIONS, type User, type ValidColor } from '#/db/schema';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '#/components/ui/select';
import { createUserSchema } from '#/lib/validators';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const CreateNewUser = () => {
    const { mutate: createUser, isPending: userPending } = useAddUser();

    function handleSubmit({ value }: { value: User }) {
        createUser(
            { user: { name: value.name, color: value.color } },
            {
                onSuccess: () => toast.success('Bruker opprettet!'),
                onError: () => toast.error('Noe gikk galt.'),
            },
        );
    }

    const form = useForm({
        defaultValues: {
            name: '',
            color: 'red' as ValidColor,
        },
        validators: {
            onBlur: createUserSchema,
        },
        onSubmit: async ({ value }) => handleSubmit({ value }),
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline">
                            <Plus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Opprett ny bruker</TooltipContent>
                </Tooltip>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Opprett ny bruker</DialogTitle>
                </DialogHeader>
                <form
                    id="new-user-form"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid &&
                                    !!field.state.value;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Navn</FieldLabel>
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
                        <form.Field
                            name="color"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel
                                            htmlFor={field.name}
                                            className="pointer-events-none"
                                        >
                                            Velg farge...
                                        </FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={(value: ValidColor) =>
                                                field.handleChange(value)
                                            }
                                            aria-invalid={isInvalid}
                                        >
                                            <SelectTrigger
                                                id={field.name}
                                                className="hover:cursor-pointer hover:bg-input/10"
                                            >
                                                <SelectValue placeholder="Ola Nordmann..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {COLOR_OPTIONS.map((color) => (
                                                    <SelectItem
                                                        key={color.value}
                                                        value={color.value}
                                                    >
                                                        {color.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </FieldGroup>
                </form>
                <form.Subscribe
                    selector={(state) => state.canSubmit && state.isDirty}
                    children={(canSubmit) => (
                        <Field orientation="horizontal">
                            <Button
                                className="w-full"
                                type="submit"
                                form="new-user-form"
                                disabled={!canSubmit || userPending}
                            >
                                Opprett
                            </Button>
                        </Field>
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};
