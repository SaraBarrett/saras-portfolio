import { usePage } from '@inertiajs/react';

type Card = {
    label: string;
    title: string;
    description: string;
};

type Translations = {
    meta_title: string;
    meta_description: string;

    nav: {
        home: string;
        about: string;
        journey: string;
        contact: string;
        night: string;
        footer: string;
    };

    hero: {
        label: string;
        title: string;
        highlight: string;
        intro: string;
        about: string;
        contact: string;
    };

    about: {
        title: string;
        photo: string;
        lead: string;
        paragraphs: string[];
        technologies: string;
    };

    areas: {
        title: string;
        intro: string;
        items: Card[];
    };

    journey: {
        title: string;
        intro: string;
        current: string;
        items: Card[];
    };

    contact: {
        title: string;
        intro: string;
        cv: string;
        new_tab: string;
        name: string;
        email: string;
        subject: string;
        message: string;
        privacy: string;
        send: string;
        sending: string;
        success: string;
        honeypot: string;
    };
};

type PortfolioProps = {
    [key: string]: unknown;
    locale: 'pt' | 'en';
    translations: Translations;
};

export default function usePortfolio() {
    const { locale, translations } = usePage<PortfolioProps>().props;

    return {
        locale,
        t: translations,
    };
}
