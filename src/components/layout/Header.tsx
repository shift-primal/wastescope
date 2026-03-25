import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b px-4 backdrop-blur-lg flex items-center justify-between">
            <Link to="/" className="text-xl py-3">
                Wastescope
            </Link>

            <div className="flex gap-x-4 items-center">
                <Link to="/import">Import</Link>
                <Link to="/dashboard" search={{} as any}>
                    Dashboard
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
