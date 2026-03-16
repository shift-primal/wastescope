import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

function getInitialMode(): ThemeMode {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    const stored = window.localStorage.getItem('theme');
    return stored as ThemeMode;
}

function applyThemeMode(mode: ThemeMode) {
    const resolved = mode;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolved);

    document.documentElement.setAttribute('data-theme', mode);

    document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>('dark');

    useEffect(() => {
        const initialMode = getInitialMode();
        setMode(initialMode);
        applyThemeMode(initialMode);
    }, []);

    function toggleMode() {
        const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
        setMode(nextMode);
        applyThemeMode(nextMode);
        window.localStorage.setItem('theme', nextMode);
    }

    const label = `Theme mode: ${mode}. Click to switch mode.`;

    return (
        <button
            type="button"
            onClick={toggleMode}
            aria-label={label}
            title={label}
            className="rounded-full border px-3 py-1.5 text-sm font-semibold  transition hover:-translate-y-0.5"
        >
            {mode === 'dark' ? (
                <Moon className="text-blue-200" />
            ) : (
                <Sun className="text-amber-400" />
            )}
        </button>
    );
}
