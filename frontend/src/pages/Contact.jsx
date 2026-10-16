import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronDown,
    Briefcase,
    Headset,
    Target,
    ClipboardList,
    ArrowRight,
    ArrowUpRight,
    CheckCircle,
    XCircle,
    ExternalLink,
    Code2,
    Globe2,
    UserPlus,
    GraduationCap,
    Handshake,
    MessageSquare,
    User,
    Building2,
    CalendarDays,
    Copy,
    Check,
    Send,
    Compass,
    ShieldCheck,
    Linkedin,
    Navigation,
    CalendarCheck,
    Search,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { OFFICE_LOCATIONS, getOfficeLocationsJsonLd } from '../config/officeLocations';
import { COMPANY, whatsappLink } from '../data/company';
import { ENQUIRY_TYPES } from '../data/links';
import Flag from '../components/Flag';
import { Reveal, SplitText } from '../components/motion/Reveal';
import {
    EASE_OUT,
    VIEWPORT,
    fadeUpItem,
    staggerParent,
    trackPointer,
    trackTilt,
    resetTilt,
} from '../components/motion/motionPresets';
import './Contact.css';

const MotionLink = motion.create(Link);

const WhatsAppIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.5.6.7-3.4-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.3a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.1-.4-.2z" />
    </svg>
);

const OFFICE_CONTACT = {
    KW: { phone: '+965 22087764', tel: '+96522087764', email: 'info@kamgroups.com', hours: 'Sun–Thu: 9:00 AM – 6:00 PM' },
    IN: {
        phone: COMPANY.phone,
        tel: COMPANY.tel,
        phones: COMPANY.phones,
        email: COMPANY.email,
        whatsapp: COMPANY.whatsapp,
        hours: 'Mon–Sat: 9:00 AM – 7:00 PM IST',
    },
};

const OFFICE_SCHEDULE = {
    KW: { timeZone: 'Asia/Kuwait', days: [0, 1, 2, 3, 4], open: 9, close: 18 },
    IN: { timeZone: 'Asia/Kolkata', days: [1, 2, 3, 4, 5, 6], open: 9, close: 19 },
};

const LINKEDIN_URL =
    'https://www.linkedin.com/company/kam-global-for-digital-ai-media-solutions-private-limited/posts/?feedView=all';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const officeStatus = (code, now) => {
    const { timeZone, days, open, close } = OFFICE_SCHEDULE[code];
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(now);
    const part = (type) => parts.find((p) => p.type === type)?.value;
    const minutes = Number(part('hour')) * 60 + Number(part('minute'));
    const isOpen = days.includes(WEEKDAYS.indexOf(part('weekday'))) && minutes >= open * 60 && minutes < close * 60;
    const time = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(now);
    return { isOpen, time };
};

const useNow = (intervalMs = 30000) => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);
    return now;
};

const enquiryCards = [
    { icon: Code2, title: 'Technology Services', desc: 'Custom development, cloud, staffing, and managed IT.', type: 'Technology Services' },
    { icon: Globe2, title: 'Global Outsourcing', desc: 'India technology and Philippines operations support.', type: 'Global Outsourcing' },
    { icon: UserPlus, title: 'Request Talent', desc: 'Roles, skills, seniority, and coverage needs.', type: 'Request Talent' },
    { icon: GraduationCap, title: 'Product Demo', desc: 'LearnX, EduAiTutors, or AI-Powered LMS.', type: 'Product Demo' },
    { icon: Handshake, title: 'Partnership', desc: 'Collaboration and channel conversations.', type: 'Partnership' },
    { icon: Briefcase, title: 'Careers', desc: 'Roles, applications, and talent network.', type: 'Careers', link: '/careers' },
    { icon: MessageSquare, title: 'General Enquiry', desc: 'Anything else our team can help with.', type: 'General Enquiry' },
];

const helpChannels = [
    { icon: Briefcase, title: 'Business Inquiry', email: 'info@kamglobalai.com' },
    { icon: Headset, title: 'Technical Support', email: 'itsupport@kamglobalai.com' },
    { icon: Target, title: 'Partnership', email: 'info@kamglobalai.com' },
    { icon: ClipboardList, title: 'Careers', email: 'info@kamglobalai.com', link: '/careers' },
];

const rotatingTopics = [
    'a technology project',
    'global outsourcing',
    'a talent request',
    'a product demo',
    'a partnership',
    'HR & workforce support',
];

const subjectGroups = [
    {
        label: 'IT & Technology',
        options: [
            'Custom Software Development',
            'Mobile App Development',
            'UI/UX Design',
            'QA & Software Testing',
            'AI Solutions & Automation',
            'Data & Analytics',
            'ERP / CRM Implementation',
            'IT Consulting',
            'Cloud & DevOps',
            'Managed IT Services',
            'IT Staffing',
            'BOT Model',
        ],
    },
    {
        label: 'Business Operations & Workforce',
        options: [
            'Philippines Operations',
            'India Technology Delivery',
            'Sales Support',
            'Customer Experience',
            'BPO & Back Office',
            'Recruitment (RPO)',
            'Virtual Assistance',
            'Digital Marketing & Creative',
            'Industry Operations',
            'Workforce Support',
            'Global Outsourcing',
        ],
    },
    {
        label: 'HR & Workforce',
        options: [
            'Recruitment',
            'Contract Staffing',
            'Payroll Outsourcing',
            'HR Advisory',
            'Executive Search',
            'Background Verification',
            'HR Technology (ATS, HRMS, Payroll)',
            'Candidate Registration',
            'Overseas hiring help',
            'HR Partnership',
        ],
    },
    {
        label: 'Planning & Partnership',
        options: [
            'Request a Proposal',
            'Request Talent',
            'Discovery Call',
            'Engagement Models',
            'Industry Solutions',
            'Products',
            'LearnX',
            'EduAiTutors',
            'AI-Powered LMS',
            'Partnership',
            'Careers',
            'Other',
        ],
    },
];

const SUBJECT_OPTIONS = subjectGroups.flatMap((g) => g.options);

const jumpLinks = [
    { href: '#enquiry-types', label: 'Enquiry Types' },
    { href: '#form', label: 'Contact Form' },
    { href: '#next', label: 'What Happens Next' },
    { href: '#offices', label: 'Offices' },
    { href: '#faq', label: 'FAQ' },
];

const faqs = [
    {
        q: 'What happens after I submit an enquiry?',
        a: 'We review the information, route it to the appropriate team, and follow up according to our internal process. Response timing depends on the enquiry type and current workload.',
    },
    {
        q: 'Do you offer discovery conversations?',
        a: 'Yes. Select Discovery Call as the enquiry type and share enough context for us to prepare a useful first conversation.',
    },
    {
        q: 'Can I visit your offices?',
        a: 'We welcome scheduled visits to our Kuwait HQ or Bengaluru delivery center. Please arrange an appointment in advance so the right team members are available.',
    },
];

const nextSteps = [
    { icon: Send, title: 'Submit your enquiry', desc: 'Share context so we can route your message correctly.' },
    { icon: Compass, title: 'We review and route', desc: 'The appropriate team reviews fit and open questions.' },
    { icon: MessageSquare, title: 'We follow up', desc: 'We reply with the next step for your enquiry.' },
];

const REQUIRED_FIELDS = ['name', 'email', 'enquiryType', 'subject', 'message', 'consent'];

const GLOBE_MERIDIANS = [15, 45, 75, 105, 135, 165];
const GLOBE_LATITUDES = [
    { s: 0, c: 1 },
    { s: 0.574, c: 0.819 },
    { s: -0.574, c: 0.819 },
    { s: 0.906, c: 0.423 },
    { s: -0.906, c: 0.423 },
];
const GLOBE_PINS = [
    { code: 'KW', label: 'Kuwait HQ', x: 38, y: 37 },
    { code: 'IN', label: 'Bengaluru', x: 63, y: 60 },
];

const Eyebrow = ({ children, center, lines = true }) => (
    <div className={`con-eyebrow${center ? ' con-eyebrow-center' : ''}`}>
        {lines && <span className="con-eyebrow-line" aria-hidden="true" />}
        <span>{children}</span>
        {lines && <span className="con-eyebrow-line" aria-hidden="true" />}
    </div>
);

const SectionHeader = ({ eyebrow, title, accent, children }) => (
    <div className="con-section-header">
        <Reveal y={12}>
            <Eyebrow center>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText text={title} accent={accent} />
        {children && (
            <Reveal delay={0.2} y={14}>
                <p>{children}</p>
            </Reveal>
        )}
    </div>
);

const gridMotion = (stagger = 0.08, delay = 0) => ({
    variants: staggerParent(stagger, delay),
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT,
});

const FAQItem = ({ index, question, answer, isOpen, onClick }) => (
    <div className={`con-faq-item${isOpen ? ' con-faq-item--open' : ''}`}>
        <button type="button" className="con-faq-question" onClick={onClick} aria-expanded={isOpen}>
            <span className="con-faq-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="con-faq-q">{question}</span>
            <ChevronDown size={18} className="con-faq-icon" aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="con-faq-answer"
                >
                    <p>{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const OfficeStatus = ({ code, now }) => {
    const { isOpen, time } = officeStatus(code, now);
    return (
        <span className={`con-status-pill${isOpen ? ' is-open' : ''}`}>
            <span className="con-status-dot" aria-hidden="true" />
            {time} local · {isOpen ? 'Office hours' : 'Outside office hours'}
        </span>
    );
};

const Field = ({ id, label, icon: Icon, optional, done, wide, children }) => (
    <div className={`con-field${wide ? ' con-field--wide' : ''}`}>
        <label htmlFor={id}>
            {label}
            {optional ? (
                <span className="con-optional">Optional</span>
            ) : (
                <span className="con-required" aria-hidden="true">*</span>
            )}
        </label>
        <div className={`con-input${Icon ? ' con-input--icon' : ''}${done ? ' is-done' : ''}`}>
            {Icon && <Icon size={16} className="con-input-icon" aria-hidden="true" />}
            {children}
            {done && <Check size={14} strokeWidth={3} className="con-input-done" aria-hidden="true" />}
        </div>
    </div>
);

const ProgressRing = ({ value, total }) => {
    const r = 26;
    const c = 2 * Math.PI * r;
    const pct = Math.round((value / total) * 100);
    return (
        <div className={`con-ring${value === total ? ' is-complete' : ''}`} aria-live="polite">
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle className="con-ring-track" cx="32" cy="32" r={r} />
                <motion.circle
                    className="con-ring-fill"
                    cx="32"
                    cy="32"
                    r={r}
                    strokeDasharray={c}
                    initial={false}
                    animate={{ strokeDashoffset: c * (1 - value / total) }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                />
            </svg>
            <span className="con-ring-value">
                <strong>{pct}%</strong>
            </span>
            <span className="con-ring-label">
                {value} of {total} required details
            </span>
        </div>
    );
};

const messagePrompts = ['Timeline', 'Team size', 'Budget range', 'Current tools'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ConSelect = ({ id, name, value, onChange, placeholder, groups, searchable = false, invalid = false }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(-1);
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const listRef = useRef(null);
    const searchRef = useRef(null);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return groups
            .map((g) => ({ ...g, options: g.options.filter((o) => !q || o.toLowerCase().includes(q)) }))
            .filter((g) => g.options.length);
    }, [groups, query]);
    const flat = useMemo(() => filtered.flatMap((g) => g.options), [filtered]);
    const groupStarts = useMemo(
        () => filtered.map((_, gi) => filtered.slice(0, gi).reduce((n, g) => n + g.options.length, 0)),
        [filtered]
    );

    useEffect(() => {
        if (!open) return undefined;
        const onPointerDown = (e) => {
            if (!rootRef.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [open]);

    useEffect(() => {
        if (open) (searchable ? searchRef.current : listRef.current)?.focus();
    }, [open, searchable]);

    useEffect(() => {
        if (!open || active < 0) return;
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [active, open]);

    const openMenu = () => {
        setQuery('');
        setActive(Math.max(0, groups.flatMap((g) => g.options).indexOf(value)));
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
        buttonRef.current?.focus();
    };

    const choose = (option) => {
        onChange(name, option);
        close();
    };

    const onPopupKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(flat.length - 1, a + 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
        } else if (e.key === 'Home') {
            e.preventDefault();
            setActive(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            setActive(flat.length - 1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (flat[active]) choose(flat[active]);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'Tab') {
            setOpen(false);
        }
    };

    const onButtonKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            openMenu();
        }
    };

    const listId = `${id}-list`;
    const activeId = open && active >= 0 && flat[active] ? `${id}-opt-${active}` : undefined;

    return (
        <div className={`con-select${open ? ' is-open' : ''}`} ref={rootRef}>
            <button
                type="button"
                id={id}
                ref={buttonRef}
                className={`con-select-btn${value ? ' has-value' : ''}${invalid ? ' is-invalid' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-invalid={invalid || undefined}
                onClick={() => (open ? setOpen(false) : openMenu())}
                onKeyDown={onButtonKeyDown}
            >
                <span className="con-select-value">{value || placeholder}</span>
                <ChevronDown size={16} className="con-select-caret" aria-hidden="true" />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="con-select-pop"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: EASE_OUT }}
                        onKeyDown={onPopupKeyDown}
                    >
                        {searchable && (
                            <div className="con-select-search">
                                <Search size={15} aria-hidden="true" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={query}
                                    placeholder="Search topics..."
                                    aria-label="Search topics"
                                    aria-controls={listId}
                                    aria-activedescendant={activeId}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setActive(0);
                                    }}
                                />
                            </div>
                        )}
                        <div
                            ref={listRef}
                            id={listId}
                            role="listbox"
                            tabIndex={-1}
                            aria-label={placeholder}
                            aria-activedescendant={searchable ? undefined : activeId}
                            className="con-select-list"
                        >
                            {flat.length === 0 && (
                                <div className="con-select-empty">No matching topics. Try “Other”.</div>
                            )}
                            {filtered.map((group, gi) => (
                                <div
                                    key={group.label || gi}
                                    role="group"
                                    aria-labelledby={group.label ? `${id}-group-${gi}` : undefined}
                                >
                                    {group.label && (
                                        <div className="con-select-group" id={`${id}-group-${gi}`}>
                                            {group.label}
                                            <span aria-hidden="true">{group.options.length}</span>
                                        </div>
                                    )}
                                    {group.options.map((option, oi) => {
                                        const i = groupStarts[gi] + oi;
                                        const selected = option === value;
                                        return (
                                            <div
                                                key={`${group.label}-${option}`}
                                                id={`${id}-opt-${i}`}
                                                data-index={i}
                                                role="option"
                                                aria-selected={selected}
                                                className={`con-select-opt${i === active ? ' is-active' : ''}${selected ? ' is-selected' : ''}`}
                                                onMouseEnter={() => setActive(i)}
                                                onClick={() => choose(option)}
                                            >
                                                <span>{option}</span>
                                                {selected && <Check size={15} strokeWidth={2.5} aria-hidden="true" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ENQUIRY_TYPE_GROUPS = [{ label: '', options: ENQUIRY_TYPES }];

const TopicRotator = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % rotatingTopics.length), 2600);
        return () => clearInterval(id);
    }, []);
    return (
        <p className="con-rotator">
            <span className="con-rotator-label">Ready to discuss</span>
            <span className="con-rotator-slot">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={rotatingTopics[index]}
                        className="con-rotator-word"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                    >
                        {rotatingTopics[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        </p>
    );
};

const OfficeClock = ({ code, label, office, contact, now, className = '' }) => {
    const { isOpen, time } = officeStatus(code, now);
    const [hours, rest] = time.split(':');
    return (
        <div className={`con-clock ${className}`.trim()}>
            <div className="con-clock-head">
                <Flag code={code} round className="con-clock-flag" />
                <span>
                    <strong>{label}</strong>
                    <small>{office?.shortName}</small>
                </span>
            </div>
            <span className="con-clock-time" aria-label={`${time} local time`}>
                {hours}
                <span className="con-clock-colon" aria-hidden="true">:</span>
                {rest}
            </span>
            <span className={`con-status-pill${isOpen ? ' is-open' : ''}`}>
                <span className="con-status-dot" aria-hidden="true" />
                {isOpen ? 'Office hours' : 'Outside office hours'}
            </span>
            {(contact.phones || [{ phone: contact.phone, tel: contact.tel }]).map((item) => (
                <a key={item.tel} href={`tel:${item.tel}`} className="con-clock-phone">
                    <Phone size={13} aria-hidden="true" /> {item.phone}
                </a>
            ))}
            {contact.whatsapp && (
                <a href={whatsappLink()} className="con-clock-phone" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={13} /> WhatsApp
                </a>
            )}
            <span className="con-clock-hours">
                <Clock size={12} aria-hidden="true" /> {contact.hours}
            </span>
        </div>
    );
};

const HeroGlobe = ({ offices, now }) => (
    <motion.aside
        className="con-visual"
        aria-label="Reach our offices directly"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
        onPointerMove={(e) => trackTilt(e, 10)}
        onPointerLeave={resetTilt}
    >
        <div className="con-globe-stage">
            <span className="con-orbit" aria-hidden="true">
                <span className="con-orbit-item is-1"><Mail size={16} /></span>
                <span className="con-orbit-item is-2"><Phone size={16} /></span>
                <span className="con-orbit-item is-3"><MessageSquare size={16} /></span>
            </span>
            <div className="con-globe" aria-hidden="true">
                <span className="con-globe-disc" />
                <div className="con-globe-axis">
                    <div className="con-globe-spin">
                        {GLOBE_MERIDIANS.map((deg) => (
                            <span key={deg} className="con-globe-mer" style={{ '--a': `${deg}deg` }} />
                        ))}
                        {GLOBE_LATITUDES.map(({ s, c }) => (
                            <span
                                key={s}
                                className={`con-globe-lat${s === 0 ? ' is-equator' : ''}`}
                                style={{ '--s': s, '--c': c }}
                            />
                        ))}
                    </div>
                </div>
                <span className="con-globe-shine" />
            </div>
            <div className="con-globe-overlay" aria-hidden="true">
                <svg className="con-globe-arc" viewBox="0 0 100 100">
                    <path id="con-arc-path" d="M38 37 Q 62 24 63 60" />
                    <circle r="1.4" className="con-globe-arc-dot">
                        <animateMotion dur="3.2s" repeatCount="indefinite">
                            <mpath href="#con-arc-path" />
                        </animateMotion>
                    </circle>
                </svg>
                {GLOBE_PINS.map((pin) => (
                    <span
                        key={pin.code}
                        className={`con-pin is-${pin.code.toLowerCase()}`}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                        <span className="con-pin-dot" />
                        <span className="con-pin-label">
                            <Flag code={pin.code} round className="con-pin-flag" /> {pin.label}
                        </span>
                    </span>
                ))}
            </div>
        </div>
        {offices.map(({ code, label, office, contact }, i) => (
            <OfficeClock
                key={code}
                code={code}
                label={label}
                office={office}
                contact={contact}
                now={now}
                className={`con-visual-clock is-${i + 1}`}
            />
        ))}
        <a href="#offices" className="con-visual-link">
            View office details <ArrowRight size={14} aria-hidden="true" />
        </a>
    </motion.aside>
);

const mapEmbedUrl = (office) => {
    const query = office.placeId ? `${office.name}, ${office.streetAddress}` : `${office.latitude},${office.longitude}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
};

const OfficeExplorer = ({ offices, now, copied, onCopy }) => {
    const [active, setActive] = useState(0);
    const { code, office, contact, label } = offices[active];

    return (
        <div className="con-ox">
            <div className="con-ox-tabs" role="tablist" aria-label="Choose an office">
                {offices.map((item, i) => {
                    const selected = i === active;
                    return (
                        <button
                            key={item.code}
                            type="button"
                            role="tab"
                            id={`con-ox-tab-${item.code}`}
                            aria-selected={selected}
                            aria-controls="con-ox-panel"
                            className={`con-ox-tab${selected ? ' is-active' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="con-ox-indicator"
                                    className="con-ox-indicator"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="con-ox-code" aria-hidden="true">{item.code}</span>
                            <Flag code={item.code} round className="con-ox-flag" />
                            <span className="con-ox-tab-body">
                                <strong>{item.label}</strong>
                                <small>{item.office?.shortName}</small>
                                <OfficeStatus code={item.code} now={now} />
                            </span>
                            <ArrowRight size={16} className="con-ox-arrow" aria-hidden="true" />
                        </button>
                    );
                })}
                <div className="con-ox-visit">
                    <CalendarCheck size={18} aria-hidden="true" />
                    <p>
                        <strong>Planning a visit?</strong> Please arrange an appointment in advance so the right team
                        members are available.
                    </p>
                </div>
            </div>

            <div
                className="con-ox-panel"
                role="tabpanel"
                id="con-ox-panel"
                aria-labelledby={`con-ox-tab-${code}`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={code}
                        className="con-ox-card"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                        <span className="con-ox-card-tag">
                            <MapPin size={13} aria-hidden="true" /> {label}
                        </span>
                        <h3>{office?.shortName}</h3>
                        <p className="con-ox-name">{office?.name}</p>
                        <address>{office?.streetAddress}</address>
                        <ul className="con-ox-lines">
                            {(contact.phones || [{ phone: contact.phone, tel: contact.tel }]).map((item) => (
                                <li key={item.tel}>
                                    <a href={`tel:${item.tel}`}><Phone size={14} aria-hidden="true" /> {item.phone}</a>
                                </li>
                            ))}
                            {contact.whatsapp && (
                                <li>
                                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                                        <WhatsAppIcon size={14} /> WhatsApp
                                    </a>
                                </li>
                            )}
                            <li>
                                <a href={`mailto:${contact.email}`}><Mail size={14} aria-hidden="true" /> {contact.email}</a>
                            </li>
                            <li>
                                <span><Clock size={14} aria-hidden="true" /> {contact.hours}</span>
                            </li>
                        </ul>
                        <div className="con-ox-actions">
                            {office?.mapsUrl && (
                                <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" className="con-btn con-btn-primary">
                                    <Navigation size={15} aria-hidden="true" /> Get Directions
                                </a>
                            )}
                            <button
                                type="button"
                                className={`con-btn con-btn-secondary${copied === `addr-${code}` ? ' is-copied' : ''}`}
                                onClick={() => onCopy(`addr-${code}`, office?.streetAddress)}
                            >
                                {copied === `addr-${code}` ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                                {copied === `addr-${code}` ? 'Copied' : 'Copy Address'}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="con-ox-map">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.iframe
                            key={code}
                            title={`Map showing the ${label} office in ${office?.shortName}`}
                            src={mapEmbedUrl(office)}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                        />
                    </AnimatePresence>
                    <span className="con-ox-map-badge" aria-hidden="true">
                        <span className="con-status-dot" aria-hidden="true" /> {office?.shortName}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Contact = () => {
    const [searchParams] = useSearchParams();
    const requestedSubject = searchParams.get('subject') || '';
    const requestedType = searchParams.get('type') || '';
    const initialType = ENQUIRY_TYPES.includes(requestedType) ? requestedType : '';
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [copied, setCopied] = useState('');
    const now = useNow();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        enquiryType: initialType,
        subject: requestedSubject,
        startDate: '',
        message: '',
        consent: false,
        website: '',
    });
    const [status, setStatus] = useState({ type: 'idle', message: '', reference: '' });

    const subjectOptions = useMemo(() => {
        if (requestedSubject && !SUBJECT_OPTIONS.includes(requestedSubject)) {
            return [
                { label: 'From your link', options: [requestedSubject] },
                ...subjectGroups,
            ];
        }
        return subjectGroups;
    }, [requestedSubject]);

    const completed = REQUIRED_FIELDS.filter((key) => {
        const value = formData[key];
        return typeof value === 'boolean' ? value : value.trim() !== '';
    }).length;

    const messageRef = useRef(null);
    const emailValid = EMAIL_PATTERN.test(formData.email.trim());
    const aboutDone = formData.name.trim() !== '' && emailValid;
    const requirementDone = Boolean(formData.enquiryType && formData.subject && formData.message.trim());
    const formSteps = [
        { label: 'About you', done: aboutDone },
        { label: 'Your requirement', done: requirementDone },
        { label: 'Confirm & send', done: formData.consent },
    ];
    const currentStep = formSteps.findIndex((s) => !s.done);

    const addPrompt = (prompt) => {
        setFormData((prev) => {
            const base = prev.message.replace(/\s+$/, '');
            return { ...prev, message: `${base}${base ? '\n' : ''}${prompt}: ` };
        });
        requestAnimationFrame(() => {
            const el = messageRef.current;
            if (!el) return;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        });
    };

    const [missingField, setMissingField] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (missingField === name) {
            setMissingField('');
            setStatus((s) => (s.type === 'error' ? { type: 'idle', message: '', reference: '' } : s));
        }
    };

    const selectEnquiryType = (type) => {
        setMissingField('');
        setFormData((prev) => ({
            ...prev,
            enquiryType: type,
            subject: prev.subject || type,
        }));
        document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const copyText = async (key, text, fallbackHref) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            setTimeout(() => setCopied((c) => (c === key ? '' : c)), 1800);
        } catch {
            if (fallbackHref) window.location.assign(fallbackHref);
        }
    };

    const copyEmail = (key, email) => copyText(key, email, `mailto:${email}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const missing = !formData.enquiryType ? 'enquiryType' : !formData.subject ? 'subject' : '';
        if (missing) {
            setMissingField(missing);
            setStatus({
                type: 'error',
                message: missing === 'enquiryType' ? 'Please select an enquiry type.' : 'Please select a service or topic of interest.',
            });
            document.getElementById(missing)?.focus();
            return;
        }
        if (!formData.consent) {
            setStatus({ type: 'error', message: 'Please confirm you agree to the privacy notice before submitting.' });
            return;
        }
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    country: formData.country,
                    enquiryType: formData.enquiryType,
                    subject: formData.subject || formData.enquiryType || 'General Enquiry',
                    startDate: formData.startDate,
                    message: formData.message,
                    consent: formData.consent,
                    website: formData.website,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Enquiry received. We will review the information and follow up according to our internal process.',
                    reference: data.reference || '',
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    country: '',
                    enquiryType: '',
                    subject: '',
                    startDate: '',
                    message: '',
                    consent: false,
                    website: '',
                });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'An error occurred. Please check your connection and try again.' });
        }
    };

    const kuwaitOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'KW');
    const indiaOffice = OFFICE_LOCATIONS.find((o) => o.addressCountry === 'IN');
    const offices = [
        { code: 'KW', office: kuwaitOffice, contact: OFFICE_CONTACT.KW, label: 'Kuwait HQ' },
        { code: 'IN', office: indiaOffice, contact: OFFICE_CONTACT.IN, label: 'India Center' },
    ];

    const quickChannels = [
        { key: 'quick-mail', icon: Mail, label: 'Email us', value: OFFICE_CONTACT.IN.email, href: `mailto:${OFFICE_CONTACT.IN.email}`, copy: OFFICE_CONTACT.IN.email },
        ...OFFICE_CONTACT.IN.phones.map((item, index) => ({
            key: `quick-in-${index}`,
            icon: Phone,
            label: 'India',
            value: item.phone,
            href: `tel:${item.tel}`,
        })),
        { key: 'quick-wa', icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with us', href: whatsappLink(), external: true },
        { key: 'quick-kw', icon: Phone, label: 'Kuwait HQ', value: OFFICE_CONTACT.KW.phone, href: `tel:${OFFICE_CONTACT.KW.tel}` },
        { key: 'quick-li', icon: Linkedin, label: 'LinkedIn', value: 'Follow our updates', href: LINKEDIN_URL, external: true },
    ];

    return (
        <MotionConfig reducedMotion="user">
        <div className="contact-page">
            <Helmet>
                <title>Contact KAM Global AI | Discuss Your Requirements</title>
                <meta
                    name="description"
                    content="Contact KAM Global AI about technology services, products, global outsourcing, talent requests, or project proposals."
                />
                <script type="application/ld+json">{JSON.stringify(getOfficeLocationsJsonLd())}</script>
            </Helmet>

            {/* Hero */}
            <section className="con-hero">
                <span className="con-hero-glow" aria-hidden="true" />
                <span className="con-hero-glow con-hero-glow--alt" aria-hidden="true" />
                <div className="container con-hero-grid">
                    <div className="con-hero-copy">
                        <motion.span
                            className="con-hero-kicker"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                        >
                            <span className="con-hero-kicker-dot" aria-hidden="true" /> Contact Us
                        </motion.span>
                        <SplitText as="h1" text="Let's Talk About" accent="What You Need" breakBeforeAccent />
                        <Reveal delay={0.2} y={12}>
                            <TopicRotator />
                        </Reveal>
                        <Reveal delay={0.25} y={16}>
                            <p className="con-hero-lead">
                                Tell us about your project, team requirement, product interest, or operational challenge.
                                Share enough context for our team to route your enquiry to the appropriate contact.
                            </p>
                            <div className="con-hero-actions">
                                <a href="#form" className="con-btn con-btn-primary">
                                    Submit Your Enquiry <ArrowRight size={16} />
                                </a>
                                <a href="#enquiry-types" className="con-btn con-btn-secondary">
                                    Choose an Enquiry Type
                                </a>
                            </div>
                        </Reveal>
                        <motion.ul className="con-quick" {...gridMotion(0.07, 0.35)} aria-label="Quick contact options">
                            {quickChannels.map((item) => (
                                <motion.li key={item.key} className="con-quick-item" variants={fadeUpItem}>
                                    <a
                                        href={item.href}
                                        className="con-quick-link"
                                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        <span className="con-quick-icon" aria-hidden="true">
                                            <item.icon size={16} />
                                        </span>
                                        <span className="con-quick-text">
                                            <small>{item.label}</small>
                                            <strong>{item.value}</strong>
                                        </span>
                                    </a>
                                    {item.copy && (
                                        <button
                                            type="button"
                                            className={`con-copy con-copy--sm${copied === item.key ? ' is-copied' : ''}`}
                                            onClick={() => copyEmail(item.key, item.copy)}
                                            aria-label={`Copy ${item.copy}`}
                                        >
                                            {copied === item.key ? <Check size={13} /> : <Copy size={13} />}
                                            <span className="con-copy-tip" role="status">
                                                {copied === item.key ? 'Copied' : ''}
                                            </span>
                                        </button>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>
                        <Reveal delay={0.45} y={12}>
                            <nav className="con-jump-nav" aria-label="Page sections">
                                {jumpLinks.map((link, i) => (
                                    <a key={link.href} href={link.href} className="con-jump-link">
                                        <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </Reveal>
                    </div>

                    <HeroGlobe offices={offices} now={now} />
                </div>
            </section>

            {/* Scrolling enquiry band */}
            <div className="con-marquee" aria-hidden="true">
                <div className="con-marquee-track">
                    {[0, 1].map((copy) => (
                        <span key={copy} className="con-marquee-group">
                            {ENQUIRY_TYPES.map((word, i) => (
                                <span key={word} className="con-marquee-item">
                                    <span className={`con-marquee-word${i % 2 ? ' is-outline' : ''}`}>{word}</span>
                                    <span className="con-marquee-dot" />
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* Enquiry types */}
            <section id="enquiry-types" className="con-section con-types">
                <div className="container">
                    <SectionHeader eyebrow="Enquiry Types" title="Choose the Conversation" accent="You Need">
                        Route enquiries so the right team can review them.
                    </SectionHeader>

                    <motion.div className="con-types-grid" {...gridMotion(0.06)}>
                        {enquiryCards.map((item, i) => {
                            const selected = !item.link && formData.enquiryType === item.type;
                            const inner = (
                                <>
                                    <span className="con-type-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="con-type-top">
                                        <span className="con-type-icon" aria-hidden="true">
                                            <item.icon size={20} strokeWidth={1.75} />
                                        </span>
                                        {selected && (
                                            <span className="con-type-selected">
                                                <Check size={12} strokeWidth={3} aria-hidden="true" /> Selected
                                            </span>
                                        )}
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <span className="con-type-link">
                                        {item.link ? 'View careers' : 'Choose this enquiry'} <ArrowRight size={14} aria-hidden="true" />
                                    </span>
                                </>
                            );
                            return item.link ? (
                                <MotionLink
                                    key={item.title}
                                    to={item.link}
                                    className="con-type-card rv-spot"
                                    variants={fadeUpItem}
                                    onPointerMove={trackPointer}
                                >
                                    {inner}
                                </MotionLink>
                            ) : (
                                <motion.button
                                    type="button"
                                    key={item.title}
                                    className={`con-type-card rv-spot${selected ? ' is-selected' : ''}`}
                                    aria-pressed={selected}
                                    variants={fadeUpItem}
                                    onPointerMove={trackPointer}
                                    onClick={() => selectEnquiryType(item.type)}
                                >
                                    {inner}
                                </motion.button>
                            );
                        })}
                        <motion.a href="#form" className="con-type-card con-type-card--cta" variants={fadeUpItem}>
                            <span className="con-type-icon" aria-hidden="true"><Send size={20} /></span>
                            <h3>Not sure which fits?</h3>
                            <p>Go straight to the form and describe what you need.</p>
                            <span className="con-type-link">
                                Open the form <ArrowRight size={14} aria-hidden="true" />
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Form + side panel */}
            <section id="form" className="con-main">
                <div className="container">
                    <div className="con-layout">
                        <motion.div
                            className="con-form-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                        >
                            <div className="con-form-card">
                                <div className="con-form-head">
                                    <div className="con-form-head-copy">
                                        <Eyebrow lines={false}>Contact Form</Eyebrow>
                                        <h2>Give Us the Context</h2>
                                        <p className="con-form-sub">
                                            Two short sections. Fields marked <span className="con-required">*</span> are required.
                                        </p>
                                    </div>
                                    {status.type !== 'success' && (
                                        <ProgressRing value={completed} total={REQUIRED_FIELDS.length} />
                                    )}
                                </div>

                                {status.type !== 'success' && (
                                    <ol className="con-form-steps" aria-label="Form progress">
                                        {formSteps.map((step, i) => (
                                            <li
                                                key={step.label}
                                                className={`con-form-step${step.done ? ' is-done' : ''}${i === currentStep ? ' is-current' : ''}`}
                                            >
                                                <span className="con-form-step-dot" aria-hidden="true">
                                                    {step.done ? <Check size={13} strokeWidth={3} /> : i + 1}
                                                </span>
                                                <span className="con-form-step-label">
                                                    {step.label}
                                                    <span className="sr-only">{step.done ? ' (complete)' : ''}</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                )}

                                <AnimatePresence>
                                    {(status.type === 'loading' || status.type === 'error') && (
                                        <motion.div
                                            key={status.type}
                                            className={`con-status con-status--${status.type}`}
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            role={status.type === 'error' ? 'alert' : 'status'}
                                        >
                                            {status.type === 'error' && <XCircle size={18} aria-hidden="true" />}
                                            {status.type === 'loading' && <span className="con-spinner" aria-hidden="true" />}
                                            <span>{status.message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {status.type === 'success' ? (
                                    <motion.div
                                        className="con-success"
                                        role="status"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease: EASE_OUT }}
                                    >
                                        <svg className="con-success-check" viewBox="0 0 64 64" aria-hidden="true">
                                            <motion.circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, ease: EASE_OUT }}
                                            />
                                            <motion.path
                                                d="M20 33 l8 8 l16 -18"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.45 }}
                                            />
                                        </svg>
                                        <h3>
                                            <CheckCircle size={18} aria-hidden="true" /> Enquiry received
                                        </h3>
                                        <p>{status.message}</p>
                                        {status.reference && (
                                            <p className="con-success-ref">
                                                Reference <strong>{status.reference}</strong>
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            className="con-btn con-btn-secondary"
                                            onClick={() => setStatus({ type: 'idle', message: '', reference: '' })}
                                        >
                                            Send Another Enquiry
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form className="con-form" onSubmit={handleSubmit}>
                                        <fieldset className={`con-fieldset${aboutDone ? ' is-done' : ''}`}>
                                            <legend>
                                                <span className="con-legend-num" aria-hidden="true">
                                                    {aboutDone ? <Check size={13} strokeWidth={3} /> : '1'}
                                                </span>
                                                About you
                                                <small>Who should we reply to?</small>
                                            </legend>
                                            <div className="con-form-row">
                                                <Field id="name" label="Full Name" icon={User} done={formData.name.trim() !== ''}>
                                                    <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required value={formData.name} onChange={handleInputChange} />
                                                </Field>
                                                <Field id="email" label="Work Email" icon={Mail} done={emailValid}>
                                                    <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required value={formData.email} onChange={handleInputChange} />
                                                </Field>
                                            </div>
                                            <div className="con-form-row">
                                                <Field id="company" label="Company" icon={Building2} optional>
                                                    <input id="company" name="company" type="text" placeholder="Organisation name" autoComplete="organization" value={formData.company} onChange={handleInputChange} />
                                                </Field>
                                                <Field id="country" label="Country / Region" icon={Globe2} optional>
                                                    <input id="country" name="country" type="text" placeholder="e.g. Kuwait, India, UAE" autoComplete="country-name" value={formData.country} onChange={handleInputChange} />
                                                </Field>
                                            </div>
                                            <div className="con-form-row">
                                                <Field id="phone" label="Phone" icon={Phone} optional wide>
                                                    <input id="phone" name="phone" type="tel" placeholder="+965 / +91 ..." autoComplete="tel" value={formData.phone} onChange={handleInputChange} />
                                                </Field>
                                            </div>
                                        </fieldset>

                                        <fieldset className={`con-fieldset${requirementDone ? ' is-done' : ''}`}>
                                            <legend>
                                                <span className="con-legend-num" aria-hidden="true">
                                                    {requirementDone ? <Check size={13} strokeWidth={3} /> : '2'}
                                                </span>
                                                Your requirement
                                                <small>What do you need help with?</small>
                                            </legend>
                                            <div className="con-form-row">
                                                <Field id="enquiryType" label="Enquiry Type" icon={ClipboardList}>
                                                    <ConSelect
                                                        id="enquiryType"
                                                        name="enquiryType"
                                                        value={formData.enquiryType}
                                                        onChange={setField}
                                                        placeholder="Select enquiry type"
                                                        groups={ENQUIRY_TYPE_GROUPS}
                                                        invalid={missingField === 'enquiryType'}
                                                    />
                                                </Field>
                                                <Field id="subject" label="Service / Topic of Interest" icon={Target}>
                                                    <ConSelect
                                                        id="subject"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={setField}
                                                        placeholder="Select a topic"
                                                        groups={subjectOptions}
                                                        searchable
                                                        invalid={missingField === 'subject'}
                                                    />
                                                </Field>
                                            </div>
                                            <div className="con-form-row">
                                                <Field id="startDate" label="Desired Start Date" icon={CalendarDays} optional wide>
                                                    <input id="startDate" name="startDate" type="text" placeholder="e.g. Q2 2026 / flexible" value={formData.startDate} onChange={handleInputChange} />
                                                </Field>
                                            </div>
                                            <div className="con-field">
                                                <label htmlFor="message">
                                                    <span>
                                                        Project or Role Summary <span className="con-required" aria-hidden="true">*</span>
                                                    </span>
                                                    <span className="con-count">{formData.message.length} characters</span>
                                                </label>
                                                <div className={`con-input con-input--area${formData.message.trim() ? ' is-done' : ''}`}>
                                                    <textarea
                                                        ref={messageRef}
                                                        id="message"
                                                        name="message"
                                                        placeholder="Tell us about the requirement, timeline, and any constraints..."
                                                        rows="5"
                                                        required
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="con-prompts">
                                                        <span className="con-prompts-label">Add detail:</span>
                                                        {messagePrompts.map((prompt) => (
                                                            <button
                                                                key={prompt}
                                                                type="button"
                                                                className="con-prompt"
                                                                onClick={() => addPrompt(prompt)}
                                                            >
                                                                + {prompt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div className={`con-consent${formData.consent ? ' is-checked' : ''}`}>
                                            <input
                                                id="consent"
                                                name="consent"
                                                type="checkbox"
                                                checked={formData.consent}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="con-check" aria-hidden="true">
                                                <Check size={13} strokeWidth={3.5} />
                                            </span>
                                            <label htmlFor="consent">
                                                I agree to the processing of this enquiry in line with the{' '}
                                                <Link to="/privacy">privacy notice</Link>.
                                            </label>
                                        </div>
                                        <div aria-hidden="true" className="con-honeypot">
                                            <label htmlFor="website">Website</label>
                                            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleInputChange} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="con-btn con-btn-primary con-btn-full con-submit"
                                            disabled={status.type === 'loading'}
                                        >
                                            <span className="con-submit-shine" aria-hidden="true" />
                                            {status.type === 'loading' && <span className="con-spinner con-spinner--light" aria-hidden="true" />}
                                            {status.type === 'loading' ? 'Sending...' : 'Submit Enquiry'}
                                            {status.type !== 'loading' && <Send size={16} />}
                                        </button>
                                        <p className="con-form-note">
                                            <ShieldCheck size={14} aria-hidden="true" /> Fields marked Optional can be left blank.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        <aside className="con-side" aria-label="What happens next and direct channels">
                            <motion.div
                                id="next"
                                className="con-side-card con-side-next"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
                            >
                                <Eyebrow lines={false}>What Happens Next</Eyebrow>
                                <h3>A Clear <span>First Step</span></h3>
                                <p className="con-side-lead">
                                    After submission you will see a confirmation message and reference number when available.
                                </p>
                                <div className="con-steps">
                                    <span className="con-steps-rail" aria-hidden="true">
                                        <motion.span
                                            className="con-steps-fill"
                                            initial={{ scaleY: 0 }}
                                            whileInView={{ scaleY: 1 }}
                                            viewport={VIEWPORT}
                                            transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.3 }}
                                        />
                                    </span>
                                    <motion.ol {...gridMotion(0.18, 0.25)}>
                                        {nextSteps.map((item, i) => (
                                            <motion.li key={item.title} className="con-step" variants={fadeUpItem}>
                                                <span className="con-step-node" aria-hidden="true">
                                                    <item.icon size={16} />
                                                </span>
                                                <div>
                                                    <small>Step {String(i + 1).padStart(2, '0')}</small>
                                                    <strong>{item.title}</strong>
                                                    <p>{item.desc}</p>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ol>
                                </div>
                                <Link to="/services" className="con-side-link">
                                    Explore Services <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                            </motion.div>

                            <motion.div
                                id="help"
                                className="con-side-card con-side-help"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
                            >
                                <Eyebrow lines={false}>Direct Channels</Eyebrow>
                                <h3>How Can We <span>Help?</span></h3>
                                <p className="con-side-lead">Prefer email? Choose the channel that best fits your inquiry.</p>
                                <ul className="con-channels-list">
                                    {helpChannels.map((item) => (
                                        <li key={item.title} className="con-channel">
                                            <span className="con-channel-icon" aria-hidden="true">
                                                <item.icon size={17} strokeWidth={1.75} />
                                            </span>
                                            <div className="con-channel-body">
                                                <strong>{item.title}</strong>
                                                {item.link ? (
                                                    <Link to={item.link} className="con-channel-link">
                                                        View careers <ArrowRight size={13} />
                                                    </Link>
                                                ) : (
                                                    <a href={`mailto:${item.email}`} className="con-channel-link">
                                                        {item.email} <ArrowUpRight size={13} />
                                                    </a>
                                                )}
                                            </div>
                                            {!item.link && (
                                                <button
                                                    type="button"
                                                    className={`con-copy${copied === item.title ? ' is-copied' : ''}`}
                                                    onClick={() => copyEmail(item.title, item.email)}
                                                    aria-label={`Copy ${item.email}`}
                                                >
                                                    {copied === item.title ? <Check size={14} /> : <Copy size={14} />}
                                                    <span className="con-copy-tip" role="status">
                                                        {copied === item.title ? 'Copied' : ''}
                                                    </span>
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Where we operate */}
            <section id="offices" className="con-section con-locations" aria-label="Office locations">
                <div className="container">
                    <SectionHeader eyebrow="Our Offices" title="Where We" accent="Operate">
                        Published office details for Kuwait HQ and India delivery center. Pick an office to see it on the map.
                    </SectionHeader>
                    <Reveal y={24}>
                        <OfficeExplorer offices={offices} now={now} copied={copied} onCopy={copyText} />
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="con-section con-faq">
                <div className="container con-faq-grid">
                    <div className="con-faq-intro">
                        <Reveal y={12}>
                            <Eyebrow>FAQ</Eyebrow>
                        </Reveal>
                        <SplitText text="Common" accent="Questions" />
                        <Reveal delay={0.2} y={14}>
                            <div className="con-faq-help">
                                <MessageSquare size={18} aria-hidden="true" />
                                <div>
                                    <strong>Still have a question?</strong>
                                    <a href={`mailto:${OFFICE_CONTACT.IN.email}`}>{OFFICE_CONTACT.IN.email}</a>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal className="con-faq-list" delay={0.15}>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={faq.q}
                                index={index}
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFaqIndex === index}
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                            />
                        ))}
                    </Reveal>
                </div>
            </section>
        </div>
        </MotionConfig>
    );
};

export default Contact;
