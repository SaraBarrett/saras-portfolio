import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import usePortfolio from '@/hooks/usePortfolio';

export default function LanguageSwitcher() {
    const { locale } = usePortfolio();
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        document.documentElement.lang =
            locale === 'pt' ? 'pt-PT' : 'en';
    }, [locale]);

    function changeLanguage(nextLocale: 'pt' | 'en') {
        if (nextLocale === locale || processing) {
            return;
        }

        router.post(`/idioma/${nextLocale}`, {}, {
            preserveScroll: true,
            preserveState: false,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <div
            className="language-switcher"
            role="group"
            aria-label="Idioma / Language"
        >
            {(['pt', 'en'] as const).map((language) => (
                <button
                    key={language}
                    type="button"
                    lang={language}
                    aria-label={
                        language === 'pt' ? 'Português' : 'English'
                    }
                    aria-pressed={locale === language}
                    disabled={processing}
                    onClick={() => changeLanguage(language)}
                >
                    {language.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
