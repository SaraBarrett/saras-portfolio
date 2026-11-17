import { Head } from '@inertiajs/react';

import PublicLayout from '@/layouts/PublicLayout';
import ContactForm from '@/components/ContactForm';
import usePortfolio from '@/hooks/usePortfolio';

const technologies = [
    'PHP / Laravel',
    'MySQL / Oracle',
    'JavaScript / React',
    'Vue.js',
    'HTML / CSS / Bootstrap',
    'Git',
];

export default function Home() {
    const { locale, t } = usePortfolio();

    return (
        <PublicLayout>
            <Head title={t.meta_title}>
                <meta
                    name="description"
                    content={t.meta_description}
                />

                <meta
                    property="og:title"
                    content={t.meta_title}
                />

                <meta
                    property="og:description"
                    content={t.meta_description}
                />

                <meta
                    property="og:locale"
                    content={locale === 'pt' ? 'pt_PT' : 'en_GB'}
                />

                <meta property="og:type" content="website" />
            </Head>

            {/* Apresentação */}
            <section
                className="container portfolio-hero"
                aria-labelledby="apresentacao-titulo"
            >
                <span className="portfolio-eyebrow">
                    {t.hero.label}
                </span>

                <h1
                    id="apresentacao-titulo"
                    className="portfolio-title"
                >
                    {t.hero.title}
                    <br />
                    <span>{t.hero.highlight}</span>
                </h1>

                <p className="portfolio-intro mb-4">
                    {t.hero.intro}
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                    <a
                        href="#sobre"
                        className="btn btn-primary"
                    >
                        {t.hero.about}
                    </a>

                    <a
                        href="#contacto"
                        className="btn btn-spirit"
                    >
                        {t.hero.contact}
                    </a>
                </div>
            </section>

            {/* Sobre mim */}
            <section
                id="sobre"
                className="container py-5"
                aria-labelledby="sobre-titulo"
            >
                <div className="portfolio-panel surface-lavender">
                    <div className="row align-items-start g-4 g-lg-5">
                        <div className="col-lg-5">
                            <div className="portfolio-photo-frame">
                                <img
                                    src="/images/sara_praia.jpg"
                                    alt={t.about.photo}
                                    className="portfolio-photo"
                                    width={1600}
                                    height={1067}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <h2
                                id="sobre-titulo"
                                className="portfolio-section-title mb-4"
                            >
                                {t.about.title}
                            </h2>

                            <p className="fs-5 mb-3">
                                {t.about.lead}
                            </p>

                            {t.about.paragraphs.map(
                                (paragraph, index) => (
                                    <p
                                        key={paragraph}
                                        className={`portfolio-muted ${
                                            index ===
                                            t.about.paragraphs.length - 1
                                                ? 'mb-0'
                                                : 'mb-3'
                                        }`}
                                    >
                                        {paragraph}
                                    </p>
                                ),
                            )}

                            <div className="portfolio-technologies mt-4">
                                <h3 className="h6 mb-3">
                                    {t.about.technologies}
                                </h3>

                                <ul className="portfolio-stack-list">
                                    {technologies.map((technology) => (
                                        <li key={technology}>
                                            {technology}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Áreas de trabalho e interesse */}
            <section
                id="areas"
                className="container py-5"
                aria-labelledby="areas-titulo"
            >
                <div className="row g-4 mb-4">
                    <div className="col-lg-7">
                        <h2
                            id="areas-titulo"
                            className="portfolio-section-title"
                        >
                            {t.areas.title}
                        </h2>

                        <p className="portfolio-muted mb-0">
                            {t.areas.intro}
                        </p>
                    </div>
                </div>

                <div className="row g-4">
                    {t.areas.items.map((area) => (
                        <div
                            key={area.label}
                            className="col-md-6 col-lg-4"
                        >
                            <article className="portfolio-card">
                                <p className="small portfolio-muted mb-3">
                                    {area.label}
                                </p>

                                <h3 className="h4 mb-3">
                                    {area.title}
                                </h3>

                                <p className="portfolio-muted mb-0">
                                    {area.description}
                                </p>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            {/* Percurso */}
            <section
                id="percurso"
                className="container py-5"
                aria-labelledby="percurso-titulo"
            >
                <div className="row g-4 g-lg-5">
                    <div className="col-lg-4">
                        <h2
                            id="percurso-titulo"
                            className="portfolio-section-title"
                        >
                            {t.journey.title}
                        </h2>

                        <p className="portfolio-muted">
                            {t.journey.intro}
                        </p>

                        <p className="portfolio-muted mb-0">
                            {t.journey.current}
                        </p>
                    </div>

                    <div className="col-lg-8">
                        <div className="row g-4">
                            {t.journey.items.map((item) => (
                                <div
                                    key={item.title}
                                    className="col-md-6"
                                >
                                    <article className="portfolio-card">
                                        <p className="small portfolio-muted mb-3">
                                            {item.label}
                                        </p>

                                        <h3 className="h4 mb-3">
                                            {item.title}
                                        </h3>

                                        <p className="portfolio-muted mb-0">
                                            {item.description}
                                        </p>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contacto */}
            <section
                id="contacto"
                className="container py-5"
                aria-labelledby="contacto-titulo"
            >
                <div className="portfolio-panel surface-sage">
                    <div className="row g-4 g-lg-5">
                        <div className="col-lg-5">
                            <h2
                                id="contacto-titulo"
                                className="portfolio-section-title"
                            >
                                {t.contact.title}
                            </h2>

                            <p className="portfolio-muted mb-4">
                                {t.contact.intro}
                            </p>

                            <div className="d-flex flex-wrap align-items-center gap-3">
                                <a
                                    href="/documents/Sara-Monteiro-CV.pdf"
                                    download="Sara-Monteiro-CV.pdf"
                                    className="btn btn-spirit contact-cv-button"
                                >
                                    {t.contact.cv}

                                    <span className="visually-hidden">
                                        {' '}(PDF)
                                    </span>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/saramargaridamonteiro/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-nav-link"
                                >
                                    LinkedIn

                                    <span className="visually-hidden">
                                        {' '}— {t.contact.new_tab}
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
