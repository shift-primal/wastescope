import { COLOR_OPTIONS, type ValidColor } from '#/db/schema';
import { CATEGORIES } from 'txcategorizer';
import * as z from 'zod';

export const dashboardSearchSchema = z.object({
    user: z.array(z.string()).optional(),
    category: z.array(z.enum(CATEGORIES)).optional(),
    minAmt: z.number().optional(),
    maxAmt: z.number().optional(),
    merchant: z.string().optional(),
    from: z.string().default(`${new Date().getFullYear() - 2}-01-01`),
    to: z.string().default(new Date().toISOString().split('T')[0]),
    sortBy: z.enum(['date', 'amount', 'merchant', 'category']).optional(),
    sortDir: z.enum(['asc', 'desc']).optional(),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().default(25),
});

export const createUserSchema = z.object({
    name: z.string().min(3, 'Minst 3 karakterer'),
    color: z.enum(COLOR_OPTIONS.map((c) => c.value) as [ValidColor, ...ValidColor[]]),
});

export const uploadFormSchema = z.object({
    file: z.instanceof(File, { message: 'Velg en fil' }),
    bank: z.enum(['dnb', 'valle'] as const),
    user: z.string().min(1, 'Velg en bruker'),
});
