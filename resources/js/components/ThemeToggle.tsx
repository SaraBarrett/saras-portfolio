import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function readSavedTheme(): Theme | null {
    try {
        const value = localStorage.getItem(STORAGE_KEY);

        return value === 'light' || value === 'dark'
            ? value
            : null;
    } catch {
        return null;
    }
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );

        const applyTheme = (nextTheme: Theme) => {
            document.documentElement.setAttribute(
                'data-bs-theme',
                nextTheme,
            );

            setTheme(nextTheme);
        };

        applyTheme(
            readSavedTheme() ?? (media.matches ? 'dark' : 'light'),
        );

        setReady(true);

        const handleSystemChange = (event: MediaQueryListEvent) => {
            if (readSavedTheme() === null) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        };

        media.addEventListener('change', handleSystemChange);

        return () => {
            media.removeEventListener('change', handleSystemChange);
        };
    }, []);

    function toggleTheme() {
        const nextTheme: Theme =
            theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute(
            'data-bs-theme',
            nextTheme,
        );

        setTheme(nextTheme);

        try {
            localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {
            // A alteração funciona mesmo sem armazenamento.
        }
    }

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            disabled={!ready}
            aria-label="Modo noturno"
            aria-pressed={theme === 'dark'}
        >
            <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
            </svg>

       
        </button>
    );
}
