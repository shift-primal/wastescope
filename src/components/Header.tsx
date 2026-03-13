import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b px-4 backdrop-blur-lg flex items-center justify-between">
            <h1 className="text-xl py-3">Wastescope</h1>
            <ThemeToggle />
        </header>
    );
}
