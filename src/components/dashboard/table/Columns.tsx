import { format as fmtDate } from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';
import type { Category } from 'txcategorizer';
import type { DbTransaction } from '#/types/transactions';
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
    Sparkles,
    TrendingUp,
    User,
    Utensils,
    type LucideIcon,
} from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { fmtAmt, getAmtCn } from '#/lib/tableUtils';

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
    'Kosmetikk': Sparkles,
    'Klær': Shirt,
    'Sparing': PiggyBank,
    'Kreditt': CreditCard,
    'Inntekt': TrendingUp,
    'Diverse': Layers,
    'Annet': CircleQuestionMark,
};

export const columns: ColumnDef<DbTransaction>[] = [
    {
        accessorKey: 'category',
        header: () => null,
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
        cell: ({ row }) => {
            const tx = row.original;
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
        accessorKey: 'date',
        header: () => null,
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
            const tx = row.original;
            const amt = Number(row.getValue('amount'));

            return (
                <div className="flex flex-col text-right mr-4">
                    <span className={getAmtCn(amt)}>{fmtAmt(amt)}</span>
                    {tx.exchangeRate ? (
                        <span className="text-xs text-muted-foreground">
                            {tx.currency}, {parseFloat(tx.exchangeRate).toFixed(2)}
                        </span>
                    ) : null}
                </div>
            );
        },
    },

    {
        accessorKey: 'user',
        header: () => null,
        size: 80,
        cell: ({ row }) => (
            <div className="flex flex-col items-center justify-center gap-1">
                <User size={14} />
                <Badge variant="outline" className="text-[0.7rem] px-1 py-0 h-4 bg-pink-900">
                    {row.getValue('user')}
                </Badge>
            </div>
        ),
    },
];
