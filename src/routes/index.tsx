import { createFileRoute, Link } from '@tanstack/react-router';
import { BarChart3, FileUp, Tags, Users } from 'lucide-react';
import { Button } from '#/components/ui/button';

export const Route = createFileRoute('/')({ component: HomePage });

const features = [
    {
        icon: FileUp,
        title: 'CSV import',
        description: 'Import transaction exports from DNB and Eika/Valle directly — no manual entry.',
    },
    {
        icon: Tags,
        title: 'Automatic categorisation',
        description: 'Rule-based parser extracts merchant and category from raw bank descriptions.',
    },
    {
        icon: BarChart3,
        title: 'Charts & filtering',
        description: 'Monthly spending trends, category breakdown, and powerful filter controls.',
    },
    {
        icon: Users,
        title: 'Multi-user',
        description: "Track multiple people's finances in one place with per-user colour coding.",
    },
];

const stack = [
    { name: 'React 19', note: 'UI' },
    { name: 'TanStack Start', note: 'SSR framework' },
    { name: 'TanStack Router', note: 'File-based routing' },
    { name: 'TanStack Query', note: 'Server state' },
    { name: 'Drizzle ORM', note: 'Type-safe queries' },
    { name: 'PostgreSQL', note: 'Database' },
    { name: 'Tailwind CSS 4', note: 'Styling' },
    { name: 'shadcn/ui', note: 'Components' },
    { name: 'Recharts', note: 'Data visualisation' },
];

export function HomePage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-y-20">
            {/* Hero */}
            <section className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight">Wastescope</h1>
                    <p className="text-lg text-muted-foreground max-w-xl">
                        A personal finance tracker for Norwegian bank CSV exports. Import,
                        categorise, and visualise your transactions.
                    </p>
                </div>
                <div className="flex gap-x-3">
                    <Button asChild>
                        <Link to="/dashboard" search={{} as any}>
                            Se dashboard →
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/import">Importer data</Link>
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section className="flex flex-col gap-y-6">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Funksjoner
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="flex gap-x-4 p-4 rounded-lg border bg-card">
                            <Icon size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                            <div className="flex flex-col gap-y-1">
                                <span className="font-medium text-sm">{title}</span>
                                <span className="text-sm text-muted-foreground">{description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech stack */}
            <section className="flex flex-col gap-y-6">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Tech stack
                </h2>
                <div className="flex flex-wrap gap-2">
                    {stack.map(({ name, note }) => (
                        <div
                            key={name}
                            className="flex items-center gap-x-1.5 px-3 py-1.5 rounded-md border bg-muted/40 text-sm"
                        >
                            <span className="font-medium">{name}</span>
                            <span className="text-muted-foreground text-xs">— {note}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
