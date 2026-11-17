import { useState } from 'react';
import type { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import usePortfolio from '@/hooks/usePortfolio';

type ContactFields = {
    name: string;
    email: string;
    subject: string;
    message: string;
    website: string;
    submission: string;
};

export default function ContactForm() {
    const { t } = usePortfolio();
    const [sent, setSent] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<ContactFields>({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
        submission: '',
    });

    const fields = [
        {
            name: 'name',
            label: t.contact.name,
            type: 'text',
            autoComplete: 'name',
            maxLength: 100,
            minLength: 2,
            column: 'col-md-6',
        },
        {
            name: 'email',
            label: t.contact.email,
            type: 'email',
            autoComplete: 'email',
            maxLength: 254,
            minLength: undefined,
            column: 'col-md-6',
        },
        {
            name: 'subject',
            label: t.contact.subject,
            type: 'text',
            autoComplete: 'off',
            maxLength: 150,
            minLength: undefined,
            column: 'col-12',
        },
    ] as const;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSent(false);

        post('/contacto', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSent(true);
            },
        });
    }

    return (
        <form onSubmit={submit} className="contact-form">
            {sent && (
                <div className="contact-feedback mb-4" role="status">
                    {t.contact.success}
                </div>
            )}

            {errors.submission && (
                <div
                    className="contact-feedback contact-feedback-error mb-4"
                    role="alert"
                >
                    {errors.submission}
                </div>
            )}

            <div className="row g-3">
                {fields.map((field) => (
                    <div key={field.name} className={field.column}>
                        <label
                            htmlFor={`contact-${field.name}`}
                            className="form-label"
                        >
                            {field.label}
                        </label>

                        <input
                            id={`contact-${field.name}`}
                            name={field.name}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            className={`form-control ${
                                errors[field.name] ? 'is-invalid' : ''
                            }`}
                            value={data[field.name]}
                            onChange={(event) =>
                                setData(field.name, event.target.value)
                            }
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            required
                            aria-invalid={Boolean(errors[field.name])}
                            aria-describedby={
                                errors[field.name]
                                    ? `contact-${field.name}-error`
                                    : undefined
                            }
                        />

                        {errors[field.name] && (
                            <div
                                id={`contact-${field.name}-error`}
                                className="invalid-feedback"
                            >
                                {errors[field.name]}
                            </div>
                        )}
                    </div>
                ))}

                <div className="col-12">
                    <label
                        htmlFor="contact-message"
                        className="form-label"
                    >
                        {t.contact.message}
                    </label>

                    <textarea
                        id="contact-message"
                        name="message"
                        rows={6}
                        className={`form-control ${
                            errors.message ? 'is-invalid' : ''
                        }`}
                        value={data.message}
                        onChange={(event) =>
                            setData('message', event.target.value)
                        }
                        minLength={20}
                        maxLength={5000}
                        required
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                            errors.message
                                ? 'contact-message-error'
                                : undefined
                        }
                    />

                    {errors.message && (
                        <div
                            id="contact-message-error"
                            className="invalid-feedback"
                        >
                            {errors.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">
                    {t.contact.honeypot}
                </label>

                <input
                    id="contact-website"
                    name="website"
                    type="text"
                    value={data.website}
                    onChange={(event) =>
                        setData('website', event.target.value)
                    }
                    autoComplete="off"
                    tabIndex={-1}
                />
            </div>

            <p className="small portfolio-muted mt-3 mb-4">
                {t.contact.privacy}
            </p>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={processing}
            >
                {processing ? t.contact.sending : t.contact.send}
            </button>
        </form>
    );
}
