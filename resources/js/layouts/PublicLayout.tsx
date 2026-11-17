import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import usePortfolio from '@/hooks/usePortfolio';

type PublicLayoutProps = {
    children: ReactNode;
};

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    const { locale, t } = usePortfolio();

    return (
        <div className="min-vh-100 d-flex flex-column">
            <header>
                <nav
                    className="container portfolio-navbar"
                    aria-label={
                        locale === 'pt'
                            ? 'Navegação principal'
                            : 'Main navigation'
                    }
                >
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <Link
                            href="/"
                            className="portfolio-brand"
                            aria-label={t.nav.home}
                        >
                            <img
                                src="/images/SaraMonteiro_final_preto.png"
                                alt="Sara Monteiro"
                                className="portfolio-logo portfolio-logo-day"
                            />

                            <img
                                src="/images/SaraMonteiro_final_branco.png"
                                alt="Sara Monteiro"
                                className="portfolio-logo portfolio-logo-night"
                            />
                        </Link>

                        <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4">
                            <a
                                href="#sobre"
                                className="portfolio-nav-link"
                            >
                                {t.nav.about}
                            </a>

                            <a
                                href="#percurso"
                                className="portfolio-nav-link"
                            >
                                {t.nav.journey}
                            </a>

                            <a
                                href="#contacto"
                                className="portfolio-nav-link"
                            >
                                {t.nav.contact}
                            </a>

                            <div className="d-flex align-items-center gap-2">
                                <LanguageSwitcher />
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main id="conteudo" className="flex-grow-1">
                {children}
            </main>

            <footer className="portfolio-footer">
                <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <span>
                        © {new Date().getFullYear()} Sara Monteiro
                    </span>

                    <span>{t.nav.footer}</span>
                </div>
            </footer>
        </div>
    );
}
