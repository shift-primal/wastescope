import { Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-auto border-t px-4 sm:px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex flex-col gap-y-0.5">
                <span className="font-medium text-foreground">Wastescope</span>
                <span className="hidden sm:inline">Personal finance tracker for Norwegian bank exports</span>
            </div>
            <div className="flex items-center gap-x-4">
                <span className="hidden sm:inline">React · TanStack · Drizzle · PostgreSQL</span>
                <a
                    href="https://github.com/kasperhaugestol/wastescope"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                    aria-label="GitHub"
                >
                    <Github size={16} />
                </a>
            </div>
        </footer>
    );
}
