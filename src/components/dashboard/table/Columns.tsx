import { format as fmtDate } from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';
import type { Category, Transaction } from 'txcategorizer';
import {
    ArrowRightLeft,
    BedDouble,
    Car,
    CircleQuestionMark,
    CreditCard,
    Cross,
    Gamepad2,
    Globe,
    House,
    HousePlug,
    Layers,
    PiggyBank,
    Plane,
    Popcorn,
    RefreshCw,
    ShieldPlus,
    Shirt,
    ShoppingBasket,
    TrendingUp,
    Utensils,
    type LucideIcon,
} from 'lucide-react';
import { Badge } from '#/components/ui/badge';

const categoryIcons: Record<Category, LucideIcon> = {
    'Dagligvare': ShoppingBasket,
    'Mat ute': Utensils,
    'Hjem': BedDouble,
    'Abonnement': RefreshCw,
    'Gaming': Gamepad2,
    'Netthandel': Globe,
    'Helse': Cross,
    'Forsikring': ShieldPlus,
    'Overføring': ArrowRightLeft,
    'Underholdning': Popcorn,
    'Boutgifter': HousePlug,
    'Bolig': House,
    'Bil': Car,
    'Transport': Plane,
    'Kosmetikk': Shirt,
    'Sparing': PiggyBank,
    'Kreditt': CreditCard,
    'Inntekt': TrendingUp,
    'Diverse': Layers,
    'Annet': CircleQuestionMark,
};

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'category',
        header: () => null,
        size: 50,
        cell: ({ row }) => {
            const category = row.getValue('category') as Category;
            const Icon = categoryIcons[category];
            return (
                <Badge
                    className="w-8 h-8 rounded-lg text-purple-300 bg-purple-950/10"
                    variant="outline"
                >
                    <Icon />
                </Badge>
            );
        },
    },

    {
        accessorKey: 'merchant',
        header: () => null,
        size: 40,
        cell: ({ row }) => {
            const tx = row.original as Transaction & { user: string };
            return (
                <div className="flex flex-col">
                    <span>{row.getValue('merchant')}</span>
                    <span className="text-xs text-muted-foreground">
                        {tx.counterparty ? tx.counterparty : tx.type}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: 'user',
        header: () => null,
        cell: ({ row }) => (
            <div className="flex gap-1 mt-0.5">
                <Badge variant="outline" className="text-[0.6rem] px-1 py-0 h-4">
                    {row.getValue('user')}
                </Badge>
            </div>
        ),
    },

    {
        accessorKey: 'date',
        header: () => null,
        size: 100,
        cell: ({ row }) => {
            const date = Date.parse(row.getValue('date'));
            const formattedDate = fmtDate(date, 'd. LLL');
            const formattedYear = fmtDate(date, 'yyy');
            return (
                <div className="flex flex-col items-end">
                    <span>{formattedDate}</span>
                    <span className="text-[0.6rem] text-muted-foreground">{formattedYear}</span>
                </div>
            );
        },
    },

    {
        accessorKey: 'amount',
        header: () => null,
        cell: ({ row }) => {
            const tx = row.original as Transaction & { currency: string; exchangeRate: string };
            const amt = row.getValue('amount') as number;
            return (
                <div className="flex flex-col text-right mr-4">
                    <span className={amt > 0 ? 'text-green-400' : 'text-red-400'}>
                        {amt > 0 ? '+' : ''}
                        {amt} kr
                    </span>
                    {tx.currency ? (
                        <span className="text-xs text-muted-foreground">
                            {tx.currency}, {parseFloat(tx.exchangeRate).toFixed(2)}
                        </span>
                    ) : null}
                </div>
            );
        },
    },
];
