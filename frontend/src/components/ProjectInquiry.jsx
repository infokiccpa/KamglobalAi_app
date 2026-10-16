import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    X, Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft, ArrowRight, Check, Pencil,
    Code2, RefreshCw, Bot, Cloud, UserSearch, Handshake, Package, Settings2, HelpCircle,
    Sparkles, Wrench, Users, Compass,
} from 'lucide-react';
import { request } from '../lib/api';
import { engagementModels } from '../data/engagementModels';
import './ProjectInquiry.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const NEEDS = [
    { value: 'Build new software', icon: Code2 },
    { value: 'Improve existing software', icon: RefreshCw },
    { value: 'Automate a workflow with AI', icon: Bot },
    { value: 'Cloud or DevOps support', icon: Cloud },
    { value: 'Hire technical specialists', icon: UserSearch },
    { value: 'Establish a BOT team', icon: Handshake },
    { value: 'Outsource a project', icon: Package },
    { value: 'Explore managed services', icon: Settings2 },
    { value: 'Other', icon: HelpCircle },
];

const SITUATIONS = [
    { value: 'New project', desc: 'Starting from an idea or early requirements.', icon: Sparkles },
    { value: 'Existing system needs improvement', desc: 'Something is live but needs work.', icon: Wrench },
    { value: 'Need additional team capacity', desc: 'Your team needs extra skills or hands.', icon: Users },
    { value: 'Exploring options', desc: 'Still deciding on the right approach.', icon: Compass },
];

const DEFAULT_CAPABILITIES = [
    'Web Application',
    'Mobile App',
    'Business Software / ERP / CRM',
    'AI & Automation',
    'Data & Analytics',
    'Cloud & DevOps',
    'QA & Testing',
    'UI/UX Design',
    'Managed IT Support',
    'Technical Staffing',
];

const START_PERIODS = ['As soon as possible', 'Within 1 month', 'In 1–3 months', 'In 3+ months', 'Just exploring'];
const BUDGETS = ['Under USD 10,000', 'USD 10,000–25,000', 'USD 25,000–50,000', 'USD 50,000–100,000', 'Above USD 100,000', 'Not sure yet'];
const NOT_SURE_MODEL = 'Not sure — please recommend';

const STEPS = ['Your need', 'Situation', 'Details', 'Review'];

const emptyForm = (capability = '', description = '', need = '') => ({
    need,
    situation: '',
    description,
    capabilities: capability ? [capability] : [],
    model: '',
    start: '',
    budget: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
});

const validateStep = (step, f) => {
    const errors = {};
    if (step === 0 && !f.need) errors.need = 'Please choose what you need.';
    if (step === 1 && !f.situation) errors.situation = 'Please choose the option closest to your situation.';
    if (step === 2) {
        if (f.description.trim().length < 15) errors.description = 'Please describe your requirement in a sentence or two (at least 15 characters).';
        if (f.name.trim().length < 2) errors.name = 'Please enter your name.';
        if (!EMAIL_RE.test(f.email.trim())) errors.email = 'Please enter a valid email address.';
        if (f.phone && !/^[+\d][\d\s()-]{5,}$/.test(f.phone.trim())) errors.phone = 'Please enter a valid phone number or leave it blank.';
    }
    return errors;
};

/**
 * Four-step project enquiry dialog. Submits to the site's contact system (/api/contact) as a Technology Services enquiry.
 * Remount with a new `key` to reset the prefilled capability/description.
 */
export default function ProjectInquiry({
    open,
    onClose,
    services = DEFAULT_CAPABILITIES,
    initialService = '',
    initialDescription = '',
    initialNeed = '',
    source = 'Website',
    title = 'Discuss Your Project',
    intro = 'Four short steps. Only what we need for a first conversation.',
}) {
    const dialogRef = useRef(null);
    const headingRef = useRef(null);
    const uid = useId();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(() => emptyForm(initialService, initialDescription, initialNeed));
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: 'idle' });

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const field = (name) => `${uid}-${name}`;

    const set = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const update = (e) => set(e.target.name, e.target.value);

    const toggleCapability = (value) =>
        set('capabilities', form.capabilities.includes(value) ? form.capabilities.filter((c) => c !== value) : [...form.capabilities, value]);

    const goTo = (next) => {
        setStep(next);
        setStatus((s) => (s.type === 'error' ? { type: 'idle' } : s));
        requestAnimationFrame(() => headingRef.current?.focus());
    };

    const next = () => {
        const found = validateStep(step, form);
        setErrors(found);
        const firstInvalid = Object.keys(found)[0];
        if (firstInvalid) {
            dialogRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
            return;
        }
        goTo(step + 1);
    };

    const submit = async () => {
        for (let s = 0; s < 3; s += 1) {
            const found = validateStep(s, form);
            if (Object.keys(found).length) {
                setErrors(found);
                goTo(s);
                return;
            }
        }
        setStatus({ type: 'loading' });
        try {
            const data = await request('/api/contact', {
                body: {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    company: form.company.trim(),
                    enquiryType: 'Technology Services',
                    subject: `Project enquiry: ${form.need}`,
                    message: form.description.trim(),
                    startDate: form.start,
                    details: {
                        Need: form.need,
                        'Current situation': form.situation,
                        'Required capabilities': form.capabilities.join(', '),
                        'Preferred engagement model': form.model,
                        'Expected start': form.start,
                        'Budget range': form.budget,
                        Source: source,
                    },
                    website: form.website,
                },
            });
            setStatus({ type: 'success', reference: data?.reference || '' });
            setForm(emptyForm());
            setStep(0);
        } catch (err) {
            setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
        }
    };

    const close = () => {
        onClose?.();
        if (status.type === 'success') setStatus({ type: 'idle' });
    };

    const errorProps = (name) =>
        errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${field(name)}-error` } : {};

    const errorText = (name) =>
        errors[name] && (
            <small id={`${field(name)}-error`} className="pi-error" role="alert">
                {errors[name]}
            </small>
        );

    const review = [
        { label: 'Need', value: form.need, step: 0 },
        { label: 'Current situation', value: form.situation, step: 1 },
        { label: 'Description', value: form.description, step: 2 },
        { label: 'Capabilities', value: form.capabilities.join(', '), step: 2 },
        { label: 'Engagement model', value: form.model, step: 2 },
        { label: 'Expected start', value: form.start, step: 2 },
        { label: 'Budget range', value: form.budget, step: 2 },
        { label: 'Contact', value: [form.name, form.company, form.email, form.phone].filter(Boolean).join(' · '), step: 2 },
    ];

    return (
        <dialog
            ref={dialogRef}
            className="pi-dialog"
            aria-labelledby={field('title')}
            onClose={close}
            onClick={(e) => {
                if (e.target === dialogRef.current) close();
            }}
        >
            <div className="pi-panel">
                <button type="button" className="pi-close" onClick={close} aria-label="Close">
                    <X size={20} aria-hidden="true" />
                </button>

                {status.type === 'success' ? (
                    <div className="pi-done" role="status">
                        <span className="pi-done-icon"><CheckCircle2 size={32} aria-hidden="true" /></span>
                        <h2 id={field('title')}>Thank you, we have your project details</h2>
                        <p>Our team will review your requirement and contact you by email to arrange a first conversation.</p>
                        {status.reference && (
                            <p className="pi-ref">
                                Reference: <strong>{status.reference}</strong>
                            </p>
                        )}
                        <button type="button" className="pi-btn pi-btn--navy" onClick={close}>
                            <span>Close</span>
                        </button>
                    </div>
                ) : (
                    <form
                        className="pi-form"
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (step < 3) next();
                            else submit();
                        }}
                    >
                        <header className="pi-head">
                            <h2 id={field('title')}>{title}</h2>
                            <p>{intro}</p>
                        </header>

                        <ol className="pi-progress" aria-label="Form progress">
                            {STEPS.map((label, i) => (
                                <li
                                    key={label}
                                    className={i === step ? 'is-current' : i < step ? 'is-done' : ''}
                                    aria-current={i === step ? 'step' : undefined}
                                >
                                    <span className="pi-progress-dot">{i < step ? <Check size={13} aria-hidden="true" /> : i + 1}</span>
                                    <span className="pi-progress-label">{label}</span>
                                </li>
                            ))}
                        </ol>

                        <div className="pi-step" key={step}>
                            {step === 0 && (
                                <fieldset className="pi-fieldset" {...errorProps('need')}>
                                    <legend ref={headingRef} tabIndex={-1} className="pi-legend">What do you need?</legend>
                                    <div className="pi-options pi-options--3">
                                        {NEEDS.map(({ value, icon: Icon }) => (
                                            <label key={value} className={`pi-option${form.need === value ? ' is-selected' : ''}`}>
                                                <input type="radio" name="need" value={value} checked={form.need === value} onChange={update} />
                                                <Icon size={18} aria-hidden="true" />
                                                <span>{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errorText('need')}
                                </fieldset>
                            )}

                            {step === 1 && (
                                <fieldset className="pi-fieldset" {...errorProps('situation')}>
                                    <legend ref={headingRef} tabIndex={-1} className="pi-legend">What is the current situation?</legend>
                                    <div className="pi-options pi-options--2">
                                        {SITUATIONS.map(({ value, desc, icon: Icon }) => (
                                            <label key={value} className={`pi-option pi-option--tall${form.situation === value ? ' is-selected' : ''}`}>
                                                <input type="radio" name="situation" value={value} checked={form.situation === value} onChange={update} />
                                                <Icon size={18} aria-hidden="true" />
                                                <span>
                                                    <b>{value}</b>
                                                    <small>{desc}</small>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errorText('situation')}
                                </fieldset>
                            )}

                            {step === 2 && (
                                <div className="pi-grid">
                                    <p ref={headingRef} tabIndex={-1} className="pi-legend pi-field--full">Project information</p>

                                    <div className="pi-field pi-field--full">
                                        <label htmlFor={field('description')}>Brief description <span aria-hidden="true">*</span></label>
                                        <textarea
                                            id={field('description')}
                                            name="description"
                                            rows={4}
                                            value={form.description}
                                            onChange={update}
                                            placeholder="What would you like to build, improve or support? Who will use it?"
                                            required
                                            {...errorProps('description')}
                                        />
                                        {errorText('description')}
                                    </div>

                                    <fieldset className="pi-field pi-field--full pi-fieldset">
                                        <legend className="pi-sublegend">Required capabilities <small>(optional, choose any)</small></legend>
                                        <div className="pi-chips">
                                            {services.map((s) => (
                                                <label key={s} className={`pi-chip${form.capabilities.includes(s) ? ' is-selected' : ''}`}>
                                                    <input type="checkbox" checked={form.capabilities.includes(s)} onChange={() => toggleCapability(s)} />
                                                    {form.capabilities.includes(s) && <Check size={13} aria-hidden="true" />}
                                                    <span>{s}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <div className="pi-field">
                                        <label htmlFor={field('model')}>Preferred engagement model</label>
                                        <select id={field('model')} name="model" value={form.model} onChange={update}>
                                            <option value="">Select (optional)</option>
                                            <option value={NOT_SURE_MODEL}>{NOT_SURE_MODEL}</option>
                                            {engagementModels.map((m) => (
                                                <option key={m.slug} value={m.name}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="pi-field">
                                        <label htmlFor={field('start')}>Expected start</label>
                                        <select id={field('start')} name="start" value={form.start} onChange={update}>
                                            <option value="">Select (optional)</option>
                                            {START_PERIODS.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>

                                    <div className="pi-field pi-field--full">
                                        <label htmlFor={field('budget')}>Budget range <small>(optional)</small></label>
                                        <select id={field('budget')} name="budget" value={form.budget} onChange={update}>
                                            <option value="">Prefer not to say</option>
                                            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>

                                    <div className="pi-field">
                                        <label htmlFor={field('name')}>Name <span aria-hidden="true">*</span></label>
                                        <input id={field('name')} name="name" value={form.name} onChange={update} autoComplete="name" required {...errorProps('name')} />
                                        {errorText('name')}
                                    </div>

                                    <div className="pi-field">
                                        <label htmlFor={field('company')}>Company</label>
                                        <input id={field('company')} name="company" value={form.company} onChange={update} autoComplete="organization" />
                                    </div>

                                    <div className="pi-field">
                                        <label htmlFor={field('email')}>Work email <span aria-hidden="true">*</span></label>
                                        <input
                                            id={field('email')}
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={update}
                                            autoComplete="email"
                                            required
                                            {...errorProps('email')}
                                        />
                                        {errorText('email')}
                                    </div>

                                    <div className="pi-field">
                                        <label htmlFor={field('phone')}>Phone <small>(optional)</small></label>
                                        <input id={field('phone')} name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" {...errorProps('phone')} />
                                        {errorText('phone')}
                                    </div>

                                    <div className="pi-hp" aria-hidden="true">
                                        <label htmlFor={field('website')}>Website</label>
                                        <input id={field('website')} name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <p ref={headingRef} tabIndex={-1} className="pi-legend">Review and submit</p>
                                    <dl className="pi-review">
                                        {review.map((r) => (
                                            <div key={r.label} className="pi-review-row">
                                                <dt>{r.label}</dt>
                                                <dd>{r.value || <span className="pi-review-empty">Not provided</span>}</dd>
                                                <button type="button" className="pi-review-edit" onClick={() => goTo(r.step)} aria-label={`Edit ${r.label}`}>
                                                    <Pencil size={14} aria-hidden="true" />
                                                </button>
                                            </div>
                                        ))}
                                    </dl>
                                    <p className="pi-privacy">
                                        We use these details only to respond to your enquiry. See our <Link to="/privacy" onClick={close}>privacy policy</Link>.
                                    </p>
                                </div>
                            )}
                        </div>

                        {status.type === 'error' && (
                            <p className="pi-alert" role="alert">
                                <AlertCircle size={18} aria-hidden="true" />
                                {status.message}
                            </p>
                        )}

                        <div className="pi-foot">
                            {step > 0 ? (
                                <button type="button" className="pi-btn pi-btn--ghost pi-back" onClick={() => goTo(step - 1)}>
                                    <ArrowLeft size={16} aria-hidden="true" />
                                    <span>Back</span>
                                </button>
                            ) : (
                                <p>Step 1 of 4</p>
                            )}
                            {step < 3 ? (
                                <button type="submit" className="pi-btn pi-btn--navy">
                                    <span>Continue</span>
                                    <ArrowRight size={16} aria-hidden="true" />
                                </button>
                            ) : (
                                <button type="submit" className="pi-btn pi-btn--primary" disabled={status.type === 'loading'}>
                                    {status.type === 'loading' ? (
                                        <>
                                            <Loader2 size={16} className="pi-spin" aria-hidden="true" />
                                            <span>Sending…</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Project Details</span>
                                            <Send size={16} aria-hidden="true" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </dialog>
    );
}
