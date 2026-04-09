import { format as fmtDate } from 'date-fns';
import type { ColumnDef } from '@tanstack/react-table';
import type { Category } from 'txcategorizer';
import type { DbTransaction, ValidColor } from '#/types/transactions';
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
import { getColorHex } from '#/db/schema';

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
        header: () => <span className="sr-only">Kategori</span>,
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
        header: () => <span className="sr-only">Butikk</span>,
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
        header: () => <span className="sr-only">Dato</span>,
        cell: ({ row }) => {
            const date = Date.parse(row.getValue('date'));
            const formattedDate = fmtDate(date, 'd. LLL');
            const formattedYear = fmtDate(date, 'yyy');
            return (
                <div className="flex flex-col items-end">
                    <span>{formattedDate}</span>
                    <span className="text-xs text-muted-foreground">{formattedYear}</span>
                </div>
            );
        },
    },

    {
        accessorKey: 'amount',
        header: () => <span className="sr-only">Beløp</span>,
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
        header: () => <span className="sr-only">Bruker</span>,
        size: 80,
        cell: ({ row, table }) => {
            const { colorMap } = table.options.meta as { colorMap: Record<string, ValidColor> };
            const color = colorMap[row.getValue('user') as string];
            return (
                <div className="flex flex-col items-center justify-center gap-1">
                    <User size={14} />
                    <Badge
                        variant="outline"
                        className="text-[0.7rem] px-1 py-0 h-4"
                        style={{ backgroundColor: getColorHex(color) }}
                    >
                        {row.getValue('user')}
                    </Badge>
                </div>
            );
        },
    },
];
